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
    let status = 'paid';
    let statusp = 'paid';
    let total = req.body.total;
    let aid = req.body.addressid;
    let date = new Date().toISOString().split('T')[0];
    let q5 = `select * from tbl_product p inner join tbl_orderdetails o on p.product_id=o.product_id where o.customer_id='${id}' and o.order_id=0`;
    con.query(q5, (err, rows1) => {
        if (err) 
            console.log(err);
         for (let i = 0; i < rows1.length; i++)
             {
            let pid = rows1[i].product_id;
            let stock = rows1[i].stock;
            let amount = rows1[i].quantity;
            let ustock = stock - amount;
        let q4 = `update tbl_product set stock='${ustock}' where product_id='${pid}' ;`
            con.query(q4, (err, rows2) => {
                if (err) 
                console.log(err);
             });

            }

    let q1 = `insert into tbl_ordermaster(customer_id,totalamount,orderdate,status,address_id)values
        ('${id}','${total}','${date}','${status}','${aid}');`;

    con.query(q1, (err, rows) => {
        if (err) {
            console.log(err);
            res.send({ message: 'error' });
        }
        let oid = rows.insertId;
        let q2 = `update tbl_orderdetails set order_id='${oid}' where customer_id='${id}' and order_id=0`;
        con.query(q2, (err, rows1) => {
            if (err) {
                console.log(err);
                res.send({ message: 'error' });
            }
              
            let q3 = `insert into tbl_payment(order_id,totalamount,paymentdate,status)values
        ('${oid}','${total}','${date}','${statusp}');`
            con.query(q3, (err, rows2) => {
                if (err) {
                    console.log(err);
                    res.send({ message: 'error' });
                }
                 return res.send({ message: 'success' });
            });
        });
    });
      });
            });


module.exports = router;
