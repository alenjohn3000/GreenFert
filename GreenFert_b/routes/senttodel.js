var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_greenfert"
});

router.post('/', ( req, res, next) => {

    var id = req.body.data;
    var status="sent";

    let query = `update tbl_ordermaster set status='${status}'
        where order_id = '${id}'`;

    con.query(query, (err, rows) => {
        if (err)
            throw err;
        res.send({ message: 'success' });
    });

});

/* GET users listing. */
module.exports = router;
