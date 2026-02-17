var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({host:'localhost',user:'root',password:'',database:'db_greenfert'});

router.post('/', function(req, res) {
  let loginid = req.body.loginid;
  let shopname = req.body.shopname;
  let shopemail = req.body.shopemail;
  let shopcontact = req.body.shopcontact;
  let shoplicence = req.body.shoplicence;
  let shopimg = req.body.shopimg;
  let username = req.body.username;
  let password = req.body.password;

  let sqlShop = 'update tbl_shopowner set shopname=?,shopemail=?,shopcontact=?,shoplicence=?,shopimg=? where login_id=?';
  con.query(sqlShop, [shopname, shopemail, shopcontact, shoplicence, shopimg, loginid], function(err) {
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
