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
    let date = req.body.date;
    

    /* -----------------------------
       COLLECTOR-WISE SUMMARY
    ----------------------------- */
    let collectorQuery = `
        SELECT 
            w.wastecollector_id,
            w.collectorname,
            w.location_id,
            l.locationname,
            d.districtname,
            d.district_id,
            l.location_id,
            w.login_id,
            c.collecteddate,
            SUM(c.quantitycollected) AS total,
            GROUP_CONCAT(DISTINCT c.wcategory) AS categories
        FROM tbl_collectiondetails c
        INNER JOIN tbl_wastecollector w
            ON w.login_id = c.wastecollector_id
            inner join tbl_location l
            ON w.location_id = l.location_id
            inner join tbl_district d
            ON l.district_id = d.district_id
        WHERE c.collecteddate = '${date}'
        GROUP BY w.wastecollector_id, w.collectorname
    `;
console.log(collectorQuery)
    /* -----------------------------
       CATEGORY TOTALS
    ----------------------------- */
    let categoryQuery = `
        SELECT 
            wcategory,
            SUM(quantitycollected) AS total
        FROM tbl_collectiondetails
        WHERE collecteddate='${date}'
        GROUP BY wcategory
    `;

    con.query(collectorQuery, (err, collectors) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        con.query(categoryQuery, (err2, categories) => {
            console.log(categoryQuery,[date])
            if (err2) {
                console.error(err2);
                return res.status(500).send(err2);
            }

            res.send({
                collectors: collectors,
                categories: categories
            });
        });
    });
});


module.exports = router;
