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
    

    let strquery="select s.*,l.*,lg.*,d.*,a.assign_id,a.wastecollector_id from tbl_shopowner s inner join tbl_location l on s.location_id=l.location_id inner join tbl_login lg on s.login_id=lg.login_id inner join tbl_district d on l.district_id=d.district_id left join tbl_assign a on s.owner_id=a.owner_id ";
     console.log(strquery);
   con.query(strquery, (err, rows) => { 
        if (err) 
            throw err; 
        res.send(rows); 
    }); 
}); 
module.exports = router;