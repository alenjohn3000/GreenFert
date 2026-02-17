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
    // let query1 = `select * from tbl_customer where login_id='${id}'`;
    // console.log(query1);
    // con.query(query1, (err, rows1) => {
    //     if (err) throw err1;
    //     let cid = rows1[0].customer_id;
        let oid = 0;
        let pid = req.body.did;
        let quantity=req.body.quantity;
        let fquantity=quantity[pid];
        if(fquantity==undefined)
        {
            fquantity=1;
        }
            let query2 = `select * from tbl_product where product_id='${pid}'`;
    con.query(query2, (err, rows2) => {
        let amount = rows2[0].amount;


        let query = `select * from tbl_orderdetails where order_id=0 and customer_id='${id}' and product_id='${pid}';`;
        con.query(query, (err, rows) => {
            if (err) throw err;
            if (rows == '') {

                con.query(`insert into tbl_orderdetails (order_id,product_id,customer_id,quantity,amount) values
        ('${oid}','${pid}','${id}',${fquantity},'${amount}');`)
                res.send({ message: "success" });
            }
            else {
                res.send({ message: "failed" });

            }
        });
    });
        });

// });
module.exports = router;
