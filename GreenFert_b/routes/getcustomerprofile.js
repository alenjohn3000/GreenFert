var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({host:'localhost',user:'root',password:'',database:'db_greenfert'});

router.post('/', function(req, res) {
  let loginid = req.body.loginid;
  let sql = `select c.customer_id,c.customername,c.customeremail,c.customercontact,c.customer_regdate,l.login_id,l.username
             from tbl_customer c
             inner join tbl_login l on c.login_id=l.login_id
             where c.login_id=?`;
  con.query(sql, [loginid], function(err, result) {
    if (err) { res.send([]); return; }
    res.send(result);
  });
});

module.exports = router;
