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
  let loginid = req.body.loginid;
  if (!loginid) return res.send({ collected: false, details: [] });

  let ownerSql = "select owner_id from tbl_shopowner where login_id=?";
  con.query(ownerSql, [loginid], function (err, rows1) {
    if (err || !rows1 || rows1.length === 0) return res.send({ collected: false, details: [] });
    let ownerid = rows1[0].owner_id;
    let date = new Date().toISOString().slice(0, 10);

    let statusSql = "select * from tbl_wastestatus where owner_id=? and wstatus='collected' and cdate=? limit 1";
    con.query(statusSql, [ownerid, date], function (err2, rows2) {
      if (err2 || !rows2 || rows2.length === 0) return res.send({ collected: false, details: [] });

      let detailsSql = `
        SELECT 
          c.collectiondetail_id,
          c.quantitycollected,
          c.wcategory,
          c.collecteddate,
          c.note,
          w.collectorname,
          w.collectorcontact
        FROM tbl_collectiondetails c
        LEFT JOIN tbl_wastecollector w
          ON w.login_id = c.wastecollector_id
        WHERE c.owner_id=? AND c.collecteddate=?
        ORDER BY c.collectiondetail_id DESC
      `;
      con.query(detailsSql, [ownerid, date], function (err3, rows3) {
        if (err3) return res.send({ collected: true, details: [] });
        res.send({ collected: true, details: rows3 });
      });
    });
  });
});

module.exports = router;
