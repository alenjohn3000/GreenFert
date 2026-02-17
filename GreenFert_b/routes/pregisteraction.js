var express = require('express');
var router = express.Router();
var mysql=require('mysql');

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",        
    database:"db_greenfert"
});

/* GET users listing. */
router.post('/', function(req, res, next) {
    let name=req.body.name;
    let amount=req.body.amount;
    let kg=req.body.kg;
   
    let categoryid=req.body.categoryid;
    let stock=req.body.stock;
    let description=req.body.description;
    let image=req.body.image;
    let query=`select * from tbl_product where product='${name}';`;
    con.query(query,(err,rows)=>{
        if(err) throw err;
        if(rows==''){
             

    con.query(`insert into tbl_product (product,productimage,stock,amount,description,productkg,category_id) values
        ('${name}','${image}','${stock}','${amount}','${description}','${kg}','${categoryid}');`)
  res.send({message:"success"});
    }
    else{
  res.send({message:"failed"});

    }
});
});

module.exports = router;
