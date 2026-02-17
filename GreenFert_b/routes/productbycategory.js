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
    
    var id = req.body.id;

    let strquery=`select * from tbl_product p inner join tbl_pcategory c on p.category_id=c.category_id where p.category_id='${id}'`;
     console.log(strquery);
   con.query(strquery, (err, rows) => { 
        if (err) 
            throw err; 
        res.send(rows); 
    }); 
}); 
module.exports = router;