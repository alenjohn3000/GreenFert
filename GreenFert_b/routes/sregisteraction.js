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
    let sname=req.body.shopname;
    let shopemail=req.body.shopemail;
    let contact=req.body.contact;
    let password=req.body.password;
    let username=req.body.username;
    let role='shopowner';
    let status='Requested';
    let locationid=req.body.locationid;
    let shoplicence=req.body.shoplicence;
    let image=req.body.image;
let regdate = new Date().toISOString().split('T')[0];
    console.log(regdate);
    let query=`select * from tbl_shopowner where shoplicence='${shoplicence}';`;
    con.query(query,(err,rows)=>{
        if(err) throw err;
        if(rows==''){
              let q1=`insert into tbl_login (username,password,role,status) values
        ('${username}','${password}','${role}','${status}');`;

          con.query(q1,(err,rows)=>{
              if(err) throw err;
            let loginid=rows.insertId;

            con.query(`insert into tbl_shopowner (shopname,shopemail,shopcontact,shopimg,location_id,login_id,shoplicence,regdate) values
        ('${sname}','${shopemail}','${contact}','${image}','${locationid}','${loginid}','${shoplicence}','${regdate}');`)
  res.send({message:"success"});

          }); 
    
    }
    else{
  res.send({message:"failed"});

    }
});
});

module.exports = router;
