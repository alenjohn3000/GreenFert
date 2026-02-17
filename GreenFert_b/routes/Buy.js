var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_greenfert"
});

/* GET users listing. */
router.post('/', function (req, res, next) {
    let id = req.body.loginid;

    let oid = 0;
    let pid = req.body.did;
    let q = req.body.quantity;
    let amount = req.body.totalprice;



    let query = `select * from tbl_orderdetails where order_id=0 and customer_id='${id}' and product_id='${pid}';`;
    con.query(query, (err, rows) => {
        if (err) throw err;
        if (rows == '') {
            let q1 = q[pid];
            let amount1 = amount[pid];
            con.query(`insert into tbl_orderdetails (order_id,product_id,customer_id,quantity,amount) values
        ('${oid}','${pid}','${id}',${q1},'${amount1}');`)
            res.send({ message: "success" });
        }
        else {
            res.send({ message: "failed" });

        }
    });

});


module.exports = router;
