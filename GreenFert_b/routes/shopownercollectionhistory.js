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
  if (!loginid) return res.send([]);

  let ownerSql = "select owner_id from tbl_shopowner where login_id=?";
  con.query(ownerSql, [loginid], function (err, rows1) {
    if (err || !rows1 || rows1.length === 0) return res.send([]);
    let ownerid = rows1[0].owner_id;

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
      WHERE c.owner_id=?
      ORDER BY c.collecteddate DESC, c.collectiondetail_id DESC
    `;
    con.query(detailsSql, [ownerid], function (err2, rows2) {
      if (err2) return res.send([]);
      res.send(rows2);
    });
  });
});

module.exports = router;
