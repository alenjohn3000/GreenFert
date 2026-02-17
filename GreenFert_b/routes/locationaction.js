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
    let lname=req.body.locationname;
    let did=req.body.districtid;

    con.query(`insert into tbl_location (locationname,district_id) values('${lname}','${did}');`,function(err,result){
        if(err) 
            console.log(err);
  res.send({message:"success"});
});
});

module.exports = router;
