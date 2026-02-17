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

    let sqlOwner = "select owner_id from tbl_shopowner where login_id=?";
    con.query(sqlOwner, [loginid], function (err, result1) {
        if (err || !result1 || result1.length === 0) return res.send([]);
        let ownerid = result1[0].owner_id;

        let sql = `
          SELECT collectionrequest_id, owner_id, message, reply_message, message_date, pending_date
          FROM tbl_collectionrequest
          WHERE owner_id=?
          ORDER BY message_date DESC, collectionrequest_id DESC
        `;
        con.query(sql, [ownerid], function (err2, result2) {
            if (err2) return res.send([]);
            res.send(result2);
        });
    });
});

module.exports = router;
