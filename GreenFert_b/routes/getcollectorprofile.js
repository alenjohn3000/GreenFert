var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({host:'localhost',user:'root',password:'',database:'db_greenfert'});

router.post('/', function(req, res) {
  let loginid = req.body.loginid;
  let sql = `select w.wastecollector_id,w.collectorname,w.collectoremail,w.collectorcontact,w.collectorimage,w.regdate,
                    l.username,l.login_id,lo.locationname,d.districtname
             from tbl_wastecollector w
             inner join tbl_login l on w.login_id=l.login_id
             left join tbl_location lo on w.location_id=lo.location_id
             left join tbl_district d on lo.district_id=d.district_id
             where w.login_id=?`;
  con.query(sql, [loginid], function(err, result) {
    if (err) { res.send([]); return; }
    res.send(result);
  });
});

module.exports = router;
