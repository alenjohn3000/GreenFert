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
    let cname=req.body.cname;
    let cemail=req.body.cemail;
    let contact=req.body.contact;
    let password=req.body.password;
    let username=req.body.username;
    let role='customer';
    let status='pending';
    let regdate = new Date().toISOString().split('T')[0];

    let query=`select * from tbl_customer where customeremail='${cemail}';`;
    con.query(query,(err,rows)=>{
        if(err) throw err;
        if(rows==''){

            let q1=`insert into tbl_login (username,password,role,status) values
        ('${username}','${password}','${role}','${status}');`;

          con.query(q1,(err,rows)=>{
              if(err) throw err;
            let loginid=rows.insertId;

    con.query(`insert into tbl_customer (customername,customeremail,customercontact,login_id,customer_regdate) values
        ('${cname}','${cemail}','${contact}','${loginid}','${regdate}');`)
  res.send({message:"success"});
    });
    }
  
    else{
  res.send({message:"failed"});

    }
});
});

module.exports = router;
