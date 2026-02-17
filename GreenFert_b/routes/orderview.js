var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_greenfert"
});

router.get('/', function (req, res, next) {

    let strquery = `select m.order_id,m.totalamount,m.orderdate,m.status,c.customername from tbl_ordermaster m inner join tbl_customer c on m.customer_id=c.login_id
union 
select m.order_id,m.totalamount,m.orderdate,m.status,s.shopname from tbl_ordermaster m inner join tbl_shopowner s on m.customer_id=s.login_id`;
    console.log(strquery);
    con.query(strquery, (err, rows) => {
        if (err)
            throw err;
        res.send(rows);
    });
});
module.exports = router;