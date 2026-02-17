var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_greenfert"
});

router.post('/', function (req, res, next) {
    let oid = req.body.orderid;

    let strquery = `SELECT m.order_id,m.totalamount,m.orderdate,m.status,m.address_id,c.customername,c.customeremail,c.customercontact,o.orderdetails_id,o.product_id,o.quantity,
o.amount AS product_total,p.product,p.productimage
FROM tbl_orderdetails o
LEFT JOIN tbl_ordermaster m
ON o.order_id = m.order_id
INNER JOIN tbl_product p
ON o.product_id = p.product_id
INNER JOIN tbl_customer c
ON m.customer_id = c.login_id
WHERE o.order_id = '${oid}'
union 
SELECT m.order_id,m.totalamount,m.orderdate,m.status,m.address_id,s.shopname,s.shopemail,s.shopcontact,o.orderdetails_id,o.product_id,o.quantity,
o.amount AS product_total,p.product,p.productimage
FROM tbl_orderdetails o
LEFT JOIN tbl_ordermaster m
ON o.order_id = m.order_id
INNER JOIN tbl_product p
ON o.product_id = p.product_id
INNER JOIN tbl_shopowner s
ON m.customer_id = s.login_id
WHERE o.order_id = '${oid}'`;

    console.log(strquery);
    con.query(strquery, (err, rows) => {
        if (err)
            throw err;
        res.send(rows);
    });
});
module.exports = router;