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
    var status = "Accepted"; 
    let query = `update tbl_login set status='${status}' where login_id='${id}'`; 
    console.log(query); 
    con.query(query, (err, rows) => { 
        if (err) 
            throw err; 
        res.send({message:'Success'}); 
    }); 
}); 
/* GET users listing. */ 
 
module.exports = router;