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
    let wcid=req.body.id;
    let sid=req.body.oid;
    let status="assigned";
  

    let query=`select * from tbl_assign where wastecollector_id='${wcid}' and owner_id='${sid}';`;
    con.query(query,(err,rows)=>{
        if(err) throw err;
        if(rows==''){

         let q1=`insert into tbl_assign (owner_id,wastecollector_id) values
        ('${sid}','${wcid}');`;

          con.query(q1,(err,rows)=>{
              if(err) throw err;


               
              
          res.send({message:"success"});

});
    }
  
    else{
  res.send({message:"failed"});

    }
});
});

module.exports = router;
