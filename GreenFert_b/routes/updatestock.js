var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_greenfert"
});

router.post('/', ( req, res, next) => {

    var nstock = req.body.nstock;
    var nprice = req.body.nprice;
    var newstock = req.body.newstock;
    var finalstock = parseInt(nstock) + parseInt(newstock);
let regdate = new Date().toISOString().split('T')[0];
    var id = req.body.productid;

    let query = `insert into tbl_productstock (newstock,newprice,updatedate,product_id) values('${nstock}','${nprice}','${regdate}','${id}');`;

    con.query(query, (err, rows) => {
        if (err)
            throw err;
        let q1 = `update tbl_product set stock='${finalstock}',amount='${nprice}' where product_id = '${id}'`;
          con.query(q1,(err,rows)=>{
              if(err) throw err;

          }); 
        res.send({ message: 'Success' });
    });

});
module.exports = router;











module.exports = router;
