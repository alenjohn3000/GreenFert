var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_greenfert"
});

/* GET users listing. */
router.post('/', function (req, res, next) {
    let name = req.body.name;
    let number = req.body.number;
    let landmark = req.body.landmark;
    let pincode = req.body.pincode;
    let address = req.body.address;
    let email = req.body.email;
    let id = req.body.loginid;

    con.query(`insert into tbl_deliveryaddress (name,email,contact,address,landmark,pincode,customer_id) values('${name}','${email}','${number}','${address}','${landmark}','${pincode}','${id}');`, function (err, result) {
    let addressid = result.insertId;
        if (err)
            console.log(err);
        res.send({  addressid: addressid});
    });
});

module.exports = router;
