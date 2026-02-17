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
    let regdate = new Date().toISOString().split('T')[0];
    let status = "NOT_AVAILABLE";
    let sql = `select * from tbl_shopowner where login_id='${id}'`;
    con.query(sql, function (err, result1) {
        if (err)
            console.log(err);
        let ownerid = result1[0].owner_id;
          con.query(`insert into tbl_wastestatus (wstatus,cdate,owner_id) values('${status}','${regdate}',${ownerid});`, function (err, result) {
        if (err)
            console.log(err);
        res.send({ message: "success" });
    });
    });
});

module.exports = router;
