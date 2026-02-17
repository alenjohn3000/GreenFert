var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({host:'localhost',user:'root',password:'',database:'db_greenfert'});

router.post('/', function(req, res) {
  let loginid = req.body.loginid;
  let username = req.body.username;
  let password = req.body.password;
  let sql = '';
  let params = [];

  if (password && password.trim() !== '') {
    sql = "update tbl_login set username=?,password=? where login_id=? and role='admin'";
    params = [username, password, loginid];
  } else {
    sql = "update tbl_login set username=? where login_id=? and role='admin'";
    params = [username, loginid];
  }

  con.query(sql, params, function(err) {
    if (err) { res.send({ message: 'error' }); return; }
    res.send({ message: 'success' });
  });
});

module.exports = router;
