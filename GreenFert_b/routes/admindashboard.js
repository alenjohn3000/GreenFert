const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_greenfert"
});

router.post('/', (req, res) => {

  const response = {};
  const range = (req.body && req.body.range) ? req.body.range : 'month';
  const from = req.body && req.body.from ? req.body.from : '';
  const to = req.body && req.body.to ? req.body.to : '';
  const month = req.body && req.body.month ? req.body.month : '';
  const year = req.body && req.body.year ? req.body.year : '';

  let ordersWhere = '';
  let wasteWhere = '';
  let paymentWhere = '';

  if (range === 'all') {
    ordersWhere = '';
    wasteWhere = '';
    paymentWhere = '';
  } else if (range === 'range' && from && to) {
    ordersWhere = `WHERE DATE(orderdate) BETWEEN '${from}' AND '${to}'`;
    wasteWhere = `WHERE DATE(collecteddate) BETWEEN '${from}' AND '${to}'`;
    paymentWhere = ` AND DATE(paymentdate) BETWEEN '${from}' AND '${to}'`;
  } else if (range === 'year' && year) {
    ordersWhere = `WHERE YEAR(orderdate)='${year}'`;
    wasteWhere = `WHERE YEAR(collecteddate)='${year}'`;
    paymentWhere = ` AND YEAR(paymentdate)='${year}'`;
  } else if (range === 'month' && month && year) {
    ordersWhere = `WHERE MONTH(orderdate)='${month}' AND YEAR(orderdate)='${year}'`;
    wasteWhere = `WHERE MONTH(collecteddate)='${month}' AND YEAR(collecteddate)='${year}'`;
    paymentWhere = ` AND MONTH(paymentdate)='${month}' AND YEAR(paymentdate)='${year}'`;
  } else {
    ordersWhere = "WHERE MONTH(orderdate)=MONTH(CURDATE()) AND YEAR(orderdate)=YEAR(CURDATE())";
    wasteWhere = "WHERE MONTH(collecteddate)=MONTH(CURDATE()) AND YEAR(collecteddate)=YEAR(CURDATE())";
    paymentWhere = " AND MONTH(paymentdate)=MONTH(CURDATE()) AND YEAR(paymentdate)=YEAR(CURDATE())";
  }

  /* 1. DASHBOARD COUNTS */
  const statsQuery = `
    SELECT
      (SELECT COUNT(*) FROM tbl_customer) AS customers,
      (SELECT COUNT(*) FROM tbl_shopowner) AS shopowners,
      (SELECT COUNT(*) FROM tbl_wastecollector) AS collectors,
      (SELECT COUNT(*) FROM tbl_ordermaster ${ordersWhere}) AS orders,
      (SELECT IFNULL(SUM(totalamount),0)
         FROM tbl_payment WHERE status='paid'${paymentWhere}) AS revenue,
      (SELECT IFNULL(SUM(quantitycollected),0)
         FROM tbl_collectiondetails ${wasteWhere}) AS waste
  `;

  con.query(statsQuery, (err, stats) => {
    if (err) return res.status(500).json(err);

    response.stats = stats[0];

    /* 2. RECENT ORDERS */
    const orderQuery = `
      SELECT o.order_id,
             c.customername,
             o.totalamount,
             o.status
      FROM tbl_ordermaster o
      JOIN tbl_customer c ON o.customer_id = c.customer_id
      ${ordersWhere}
      ORDER BY o.orderdate DESC
      LIMIT 5
    `;

    con.query(orderQuery, (err, orders) => {
      if (err) return res.status(500).json(err);

      response.recentOrders = orders;

      /* 3. RECENT WASTE COLLECTION */
      const wasteQuery = `
        SELECT s.shopname,
               w.collectorname,
               c.quantitycollected,
               c.collecteddate
        FROM tbl_collectiondetails c
        JOIN tbl_shopowner s ON c.owner_id = s.owner_id
        JOIN tbl_wastecollector w
          ON c.wastecollector_id = w.login_id
        ${wasteWhere}
        ORDER BY c.collecteddate DESC
        LIMIT 5
      `;

      con.query(wasteQuery, (err, waste) => {
        if (err) return res.status(500).json(err);

        response.recentWaste = waste;

        /* 4. TOP PRODUCTS */
        const topProductsQuery = `
          SELECT p.product_id,
                 p.product,
                 IFNULL(SUM(o.quantity),0) AS qty,
                 IFNULL(SUM(o.amount),0) AS revenue
          FROM tbl_orderdetails o
          JOIN tbl_ordermaster m ON o.order_id = m.order_id
          JOIN tbl_product p ON o.product_id = p.product_id
          ${ordersWhere ? ordersWhere.replace('orderdate','m.orderdate') : ''}
          GROUP BY p.product_id
          ORDER BY qty DESC
          LIMIT 5
        `;

        con.query(topProductsQuery, (err, topProducts) => {
          if (err) return res.status(500).json(err);

          response.topProducts = topProducts;

          /* 5. LOW STOCK */
          const lowStockQuery = `
            SELECT product_id, product, stock, amount
            FROM tbl_product
            WHERE stock <= 10
            ORDER BY stock ASC
            LIMIT 6
          `;

          con.query(lowStockQuery, (err, lowStock) => {
            if (err) return res.status(500).json(err);

            response.lowStock = lowStock;

            /* 6. TOP COLLECTORS */
            const topCollectorsQuery = `
              SELECT w.collectorname,
                     COUNT(*) AS pickups,
                     IFNULL(SUM(c.quantitycollected),0) AS qty
              FROM tbl_collectiondetails c
              JOIN tbl_wastecollector w
                ON c.wastecollector_id = w.login_id
              ${wasteWhere}
              GROUP BY w.collectorname
              ORDER BY qty DESC
              LIMIT 5
            `;

            con.query(topCollectorsQuery, (err, topCollectors) => {
              if (err) return res.status(500).json(err);

              response.topCollectors = topCollectors;

              /* 7. CHARTS: ORDERS BY MONTH */
              const ordersChartQuery = `
                SELECT DATE_FORMAT(orderdate,'%b %Y') AS label,
                       COUNT(*) AS orders,
                       IFNULL(SUM(totalamount),0) AS revenue
                FROM tbl_ordermaster
                ${ordersWhere}
                GROUP BY YEAR(orderdate), MONTH(orderdate)
                ORDER BY YEAR(orderdate) DESC, MONTH(orderdate) DESC
                LIMIT 6
              `;

              con.query(ordersChartQuery, (err, chartOrders) => {
                if (err) return res.status(500).json(err);

                response.chartOrders = chartOrders;

                /* 8. CHARTS: WASTE BY MONTH */
                const wasteChartQuery = `
                  SELECT DATE_FORMAT(collecteddate,'%b %Y') AS label,
                         IFNULL(SUM(quantitycollected),0) AS waste
                  FROM tbl_collectiondetails
                  ${wasteWhere}
                  GROUP BY YEAR(collecteddate), MONTH(collecteddate)
                  ORDER BY YEAR(collecteddate) DESC, MONTH(collecteddate) DESC
                  LIMIT 6
                `;

                con.query(wasteChartQuery, (err, chartWaste) => {
                  if (err) return res.status(500).json(err);

                  response.chartWaste = chartWaste;

                  /* FINAL RESPONSE */
                  res.json(response);
                });
              });
            });
          });
        });
      });
    });
  });
});

module.exports = router;
