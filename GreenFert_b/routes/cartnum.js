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
        let query = `SELECT COUNT(*) AS cartCount FROM tbl_orderdetails WHERE customer_id='${id}' AND order_id = 0;`;
        con.query(query, (err, rows) => {
            if (err) throw err; 
        res.send(rows); 
        });
    });
    


module.exports = router;
