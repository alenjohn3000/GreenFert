var express = require('express');
var router = express.Router();
var mysql=require('mysql');

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",        
    database:"db_greenfert"
});

/* GET users listing. */
router.post('/', function(req, res, next) {
    let id = req.body.loginid;
    let oid = req.body.ownerid;
    let regdate = new Date().toISOString().split('T')[0];
    let status = "collected";
    con.query(`insert into tbl_wastestatus (wastecollector_id,wstatus,cdate,owner_id) values('${id}','${status}','${regdate}',${oid});`,function(err,result){
        if(err) 
            console.log(err);
  res.send({message:"success"});
});
});

module.exports = router;
