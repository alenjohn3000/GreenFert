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
    var uid = req.body.did; 
    var oid = req.body.oid;
    let query = `delete from tbl_assign where wastecollector_id='${uid}' and owner_id='${oid}'`; 
    console.log(query); 
    con.query(query, (err, rows) => { 
        if (err) 
            throw err; 
        res.send({message:'success'}); 
    }); 
}); 
/* GET users listing. */ 
 
module.exports = router;