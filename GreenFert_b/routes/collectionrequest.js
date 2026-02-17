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
    let message = req.body.message;
    let pending_date = req.body.pending_date;

    if (!loginid || !message || !pending_date) {
        return res.send({ message: "error" });
    }

    let sql = "select owner_id from tbl_shopowner where login_id=?";
    con.query(sql, [loginid], function (err, result1) {
        if (err || !result1 || result1.length === 0) {
            return res.send({ message: "error" });
        }
        let ownerid = result1[0].owner_id;
        let insert = "insert into tbl_collectionrequest (owner_id,message,reply_message,message_date,pending_date) values (?,?,?,CURDATE(),?)";
        con.query(insert, [ownerid, message, '', pending_date], function (err2, result2) {
            if (err2) {
                return res.send({ message: "error" });
            }
            res.send({ message: "success" });
        });
    });
});

module.exports = router;
