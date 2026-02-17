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

    let id = req.body.id;
    let date = new Date().toISOString().slice(0, 10);
    let strquery1 = `select * from tbl_wastestatus where owner_id=${id} and cdate='${date}'`;
    console.log(strquery1);

    con.query(strquery1, (err, rows) => {
        if (err)
            throw err;
        res.send(rows);
    });
});
module.exports = router;