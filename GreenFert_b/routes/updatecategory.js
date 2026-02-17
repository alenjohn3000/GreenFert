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

    var dname = req.body.categoryname;
    var id = req.body.categoryid;
    var image= req.body.image;

    let query = `update tbl_pcategory set categoryname='${dname}',image='${image}'
        where category_id = '${id}'`;

    con.query(query, (err, rows) => {
        if (err)
            throw err;
        res.send({ message: 'Success' });
    });

});

/* GET users listing. */
module.exports = router;
