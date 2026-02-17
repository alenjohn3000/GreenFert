var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_greenfert"
});

router.post('/', function (req, res, next) {

  let id = req.body.loginid;
  let strquery1 = `select * from tbl_shopowner where login_id=${id}`;
      console.log(strquery1);

  con.query(strquery1, (err, rows1) => {
    if (err)
      throw err;
    let wid = rows1[0].owner_id;
    let date = new Date().toISOString().slice(0, 10);
    let strquery = `select * from tbl_wastestatus where owner_id=${wid} and cdate='${date}' and wstatus='NOT_AVAILABLE'`;
    console.log(strquery);
    con.query(strquery, (err, rows) => {
      if (err)
        throw err;
      res.send(rows);
    });
  });

});
module.exports = router;