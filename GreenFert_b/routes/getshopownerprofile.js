var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({host:'localhost',user:'root',password:'',database:'db_greenfert'});

router.post('/', function(req, res) {
  let loginid = req.body.loginid;
  let sql = `select s.owner_id,s.shopname,s.shopemail,s.shopcontact,s.shopimg,s.shoplicence,s.regdate,
                    l.username,l.login_id,lo.locationname,d.districtname
             from tbl_shopowner s
             inner join tbl_login l on s.login_id=l.login_id
             left join tbl_location lo on s.location_id=lo.location_id
             left join tbl_district d on lo.district_id=d.district_id
             where s.login_id=?`;
  con.query(sql, [loginid], function(err, result) {
    if (err) { res.send([]); return; }
    res.send(result);
  });
});

module.exports = router;
