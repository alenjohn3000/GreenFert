var express = require('express');
var router = express.Router();
var mysql=require('mysql');

var con=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"db_greenfert"
});

router.post('/',function(req,res,next){
    let cid=req.body.loginid;
    let q1=`select * from tbl_wastecollector where login_id='${cid}'`;
     console.log(q1);
   con.query(q1, (err, rows1) => { 
        if (err) 
            throw err; 
        let wid=rows1[0].wastecollector_id;

    let strquery=`select * from tbl_assign where wastecollector_id='${wid}'`;
     console.log(strquery);
   con.query(strquery, (err, rows) => { 
        if (err) 
            throw err; 
        res.send(rows); 
    }); 
    }); 

}); 
module.exports = router;