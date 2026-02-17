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

    let id = req.body.loginid;
        let date = new Date().toISOString().split('T')[0];

    let strquery1 = `SELECT * from tbl_wastestatus w inner join tbl_shopowner s on w.owner_id=s.owner_id inner join tbl_collectiondetails c on s.owner_id=c.owner_id where w.wastecollector_id='${id}' and w.cdate='${date}}' GROUP by w.wastestatus_id`;
    console.log(strquery1);

    con.query(strquery1, (err, rows) => {
        if (err)
            throw err;
        res.send(rows);
    });
});
module.exports = router;