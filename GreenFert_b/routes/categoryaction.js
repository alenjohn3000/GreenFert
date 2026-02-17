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
    let cname=req.body.categoryname;
    let image=req.body.image;
    let query=`select * from tbl_pcategory where categoryname='${cname}';`;
    con.query(query,(err,rows)=>{
        if(err) throw err;
        if(rows==''){
    con.query(`insert into tbl_pcategory (categoryname,image) values('${cname}','${image}');`)
  res.send({message:"success"});
    }
    else{
  res.send({message:"failed"});

    }
});
});

module.exports = router;
