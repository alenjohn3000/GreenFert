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
    

    let strquery="SELECT i.*, l.*, lg.*, d.*, MIN(a.assign_id) AS assign_id FROM tbl_wastecollector i INNER JOIN tbl_location l ON i.location_id = l.location_id INNER JOIN tbl_login lg ON i.login_id = lg.login_id INNER JOIN tbl_district d ON l.district_id = d.district_id LEFT JOIN tbl_assign a ON i.wastecollector_id = a.wastecollector_id GROUP BY i.wastecollector_id";

     console.log(strquery);
   con.query(strquery, (err, rows) => { 
        if (err) 
            throw err; 
        res.send(rows); 
    }); 
}); 
module.exports = router;