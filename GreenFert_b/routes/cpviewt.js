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
    let query = `select * from tbl_orderdetails where customer_id='${id}' and order_id=0`;
    console.log(query);
    con.query(query, (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});



module.exports = router;
