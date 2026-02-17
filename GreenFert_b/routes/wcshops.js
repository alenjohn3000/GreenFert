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
    let stq = `select * from tbl_wastecollector where login_id='${id}'`;
    con.query(stq, (err, rows1) => {
        if (err)
            throw err;
        //res.send(rows1); 
        let wid = rows1[0].wastecollector_id;

        let strquery = `SELECT *
FROM tbl_wastecollector c
INNER JOIN tbl_assign a ON c.wastecollector_id = a.wastecollector_id
INNER JOIN tbl_shopowner s ON a.owner_id = s.owner_id
INNER JOIN tbl_location l ON s.location_id = l.location_id
INNER JOIN tbl_district d ON l.district_id = d.district_id
WHERE c.wastecollector_id ='${wid}' `;
        console.log(strquery);
        con.query(strquery, (err, rows) => {
            if (err)
                throw err;
            res.send(rows);
        });
    });
});
module.exports = router;