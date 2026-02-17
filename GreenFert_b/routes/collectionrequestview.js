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
    let sql = `
      SELECT r.collectionrequest_id,
             r.owner_id,
             r.message,
             r.reply_message,
             r.message_date,
             r.pending_date,
             s.shopname
      FROM tbl_collectionrequest r
      JOIN tbl_shopowner s ON r.owner_id = s.owner_id
      ORDER BY r.message_date DESC, r.collectionrequest_id DESC
    `;
    con.query(sql, function (err, result) {
        if (err) {
            return res.send([]);
        }
        res.send(result);
    });
});

module.exports = router;
