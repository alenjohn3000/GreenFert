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
    

    let strquery=`select * from tbl_location where location_id='${req.body.id}'`;
     console.log(strquery);
   con.query(strquery, function (err, rows) { 
        if (err) 
            throw err; 
        res.send(rows); 
    }); 
}); 
module.exports = router;