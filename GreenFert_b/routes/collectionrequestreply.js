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
    let id = req.body.collectionrequest_id;
    let reply = req.body.reply_message;
    if (!id || !reply) {
        return res.send({ message: "error" });
    }
    let sql = "update tbl_collectionrequest set reply_message=? where collectionrequest_id=?";
    con.query(sql, [reply, id], function (err, result) {
        if (err) {
            return res.send({ message: "error" });
        }
        res.send({ message: "success" });
    });
});

module.exports = router;
