var express = require('express'); 
var router = express.Router(); 
var mysql = require('mysql'); 
var con = mysql.createConnection({ 
    host: "localhost", 
    user: "root", 
    password: "", 
    database: "db_greenfert" 
}) 
 
router.post('/', (req, res, next) => { 
    var id = req.body.did; 
     let uid = req.body.loginid;

    let query = `delete from tbl_orderdetails where product_id='${id}' and customer_id='${uid}'`; 
    console.log(query); 
    con.query(query, (err, rows) => { 
        if (err) 
            throw err; 
        res.send({message:'success'}); 
    }); 
}); 
/* GET users listing. */ 
 
module.exports = router;