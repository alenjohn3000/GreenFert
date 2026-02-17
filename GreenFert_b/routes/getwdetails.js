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
    let id=req.body.oid;
    let wid=req.body.loginid;
    let kg=req.body.kg;
    let wtype=req.body.wtype;
    let note=req.body.note;
    let regdate = new Date().toISOString().split('T')[0];

    con.query(`insert into tbl_collectiondetails (owner_id,wastecollector_id,quantitycollected,collecteddate,wcategory,note) values('${id}','${wid}','${kg}','${regdate}','${wtype}','${note}');`)
  res.send({message:"success"});
    
});

module.exports = router;
