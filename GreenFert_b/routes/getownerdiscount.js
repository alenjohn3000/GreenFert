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
    var id = req.body.loginid;
    var date = new Date().toISOString().slice(0, 10);
    let query = `select * from tbl_shopowner where login_id='${id}'`;
    con.query(query, function (err, rows) {
        if (err)
            throw err;
        let ownerid = rows[0].owner_id;
        let strquery = `SELECT * FROM tbl_wastestatus WHERE owner_id = '${ownerid}' AND DATE(cdate) >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) and wstatus='collected'`;
        console.log('id', id);
        console.log(strquery)
        con.query(strquery, function (err, rows) {
            if (err)
                throw err;
            res.send(rows);
        });
    });
});
module.exports = router;