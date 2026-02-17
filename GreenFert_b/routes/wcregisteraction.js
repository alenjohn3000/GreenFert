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
    let name=req.body.name;
    let email=req.body.email;
    let contact=req.body.contact;
    let password=req.body.password;
    let username=req.body.username;
    let role='wastecollector';
    let status='active';
    let locationid=req.body.locationid;
    let image=req.body.image;
        let regdate = new Date().toISOString().split('T')[0];

    let query=`select * from tbl_wastecollector where collectoremail='${email}';`;
    con.query(query,(err,rows)=>{
        if(err) throw err;
        if(rows==''){
         let q1=`insert into tbl_login (username,password,role,status) values
        ('${username}','${password}','${role}','${status}');`;

          con.query(q1,(err,rows)=>{
              if(err) throw err;
            let loginid=rows.insertId; 

    con.query(`insert into tbl_wastecollector (collectorname,collectoremail,collectorcontact,collectorimage,location_id,regdate,login_id) values
        ('${name}','${email}','${contact}','${image}','${locationid}','${regdate}','${loginid}');`)
  res.send({message:"success"});
    });
    }
    else{
  res.send({message:"failed"});

    }
});
});

module.exports = router;
