var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({host:'localhost',user:'root',password:'',database:'db_greenfert'});

router.post('/', function(req, res) {
  let loginid = req.body.loginid;
  let customername = req.body.customername;
  let customeremail = req.body.customeremail;
  let customercontact = req.body.customercontact;
  let username = req.body.username;
  let password = req.body.password;

  let sqlCustomer = 'update tbl_customer set customername=?,customeremail=?,customercontact=? where login_id=?';
  con.query(sqlCustomer, [customername, customeremail, customercontact, loginid], function(err) {
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
