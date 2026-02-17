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

    let strquery=`select * from tbl_deliveryaddress where customer_id='${cid}'`;
     console.log(strquery);
   con.query(strquery, (err, rows) => { 
        if (err) 
            throw err; 
        res.send(rows); 
    }); 
}); 
module.exports = router;