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

    var dname = req.body.districtname;
    var id = req.body.districtid;
    let query = `update tbl_district set districtname='${dname}'
        where district_id = '${id}'`;

    con.query(query, (err, rows) => {
        if (err)
            throw err;
        res.send({ message: 'Success' });
    });

});

module.exports = router;
