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
    let strquery=`select * from tbl_product p inner join tbl_pcategory c on p.category_id=c.category_id where p.product_id='${id}'`;
     console.log('id',id);
   con.query(strquery, function (err, rows) { 
        if (err) 
            throw err; 
        res.send(rows); 
    }); 
}); 
module.exports = router;