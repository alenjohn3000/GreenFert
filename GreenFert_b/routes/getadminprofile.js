var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({host:'localhost',user:'root',password:'',database:'db_greenfert'});

router.post('/', function(req, res) {
  let loginid = req.body.loginid;
  let sql = "select login_id, username, role, status from tbl_login where login_id=? and role='admin'";
  con.query(sql, [loginid], function(err, result) {
    if (err) { res.send([]); return; }
    res.send(result);
  });
});

module.exports = router;
