var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_greenfert"
});

router.post('/', function(req, res, next) {
  let loginid = req.body.loginid;
  if (!loginid) {
    return res.send([]);
  }

  let strquery = `
    SELECT 
      m.order_id,
      m.totalamount,
      m.orderdate,
      m.status,
      m.address_id,
      COUNT(o.orderdetails_id) AS item_count
    FROM tbl_ordermaster m
    LEFT JOIN tbl_orderdetails o ON m.order_id = o.order_id
    WHERE m.customer_id = ?
    GROUP BY m.order_id
    ORDER BY m.orderdate DESC, m.order_id DESC
  `;

  con.query(strquery, [loginid], function(err, rows) {
    if (err) {
      return res.send([]);
    }
    res.send(rows);
  });
});

module.exports = router;
