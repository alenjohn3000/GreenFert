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

    var product = req.body.product;
    var id = req.body.productid;
    var image= req.body.image;
    var stock= req.body.stock;
    var amount= req.body.amount;
    var kg= req.body.kg;
    var description= req.body.description;
    var categoryid= req.body.categoryid;

    let query = `update tbl_product set product='${product}',productimage='${image}',stock='${stock}',amount='${amount}',productkg='${kg}',description='${description}',category_id='${categoryid}'
        where product_id = '${id}'`;

    con.query(query, (err, rows) => {
        if (err)
            throw err;
        res.send({ message: 'Success' });
    });

});

/* GET users listing. */
module.exports = router;
