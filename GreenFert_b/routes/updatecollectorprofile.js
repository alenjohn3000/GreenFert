var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({host:'localhost',user:'root',password:'',database:'db_greenfert'});

router.post('/', function(req, res) {
  let loginid = req.body.loginid;
  let collectorname = req.body.collectorname;
  let collectoremail = req.body.collectoremail;
  let collectorcontact = req.body.collectorcontact;
  let username = req.body.username;
  let password = req.body.password;

  let sqlCollector = 'update tbl_wastecollector set collectorname=?,collectoremail=?,collectorcontact=? where login_id=?';
  con.query(sqlCollector, [collectorname, collectoremail, collectorcontact, loginid], function(err) {
    if (err) { res.send({ message: 'error' }); return; }

    let sqlLogin = '';
    let params = [];
    if (password && password.trim() !== '') {
      sqlLogin = 'update tbl_login set username=?,password=? where login_id=?';
      params = [username, password, loginid];
    } else {
      sqlLogin = 'update tbl_login set username=? where login_id=?';
      params = [username, loginid];
    }

    con.query(sqlLogin, params, function(err2) {
      if (err2) { res.send({ message: 'error' }); return; }
      res.send({ message: 'success' });
    });
  });
});

module.exports = router;
