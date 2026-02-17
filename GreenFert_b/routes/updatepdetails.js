var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_greenfert"
});

router.post('/', (req, res, next) => {

    let id = req.body.loginid;
    let q = req.body.quantity;
    let amount = req.body.totalprice;
    let que = `select * from tbl_orderdetails where customer_id='${id}' and order_id=0`;
    con.query(que, (err, rows1) => {
        if (err)
            throw err;
        for (let i = 0; i < rows1.length; i++) {
            let pid = rows1[i].product_id;
            let q1 = q[pid];
            let amount1 = amount[pid];
            let query = `update tbl_orderdetails set quantity='${q1}',amount='${amount1}' where product_id = '${pid}' and customer_id='${id}'`;

            con.query(query, (err, rows) => {
                if (err)
                    throw err;
            });
        }
                res.send({ message: 'success' });

    });
});


/* GET users listing. */
module.exports = router;
