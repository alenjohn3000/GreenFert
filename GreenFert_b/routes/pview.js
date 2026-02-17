var express = require('express');
var router = express.Router();
var mysql=require('mysql');

var con=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"db_greenfert"
});

router.get('/',function(req,res,next){
    

    let strquery="select * from tbl_product p inner join tbl_pcategory c on p.category_id=c.category_id";
     console.log(strquery);
   con.query(strquery, (err, rows) => { 
        if (err) 
            throw err; 
        res.send(rows); 
    }); 
}); 
module.exports = router;