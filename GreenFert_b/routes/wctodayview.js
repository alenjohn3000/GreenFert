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

  var wid = req.body.id;
  let date = req.body.date;
  let strquery1 = `select * from tbl_wastecollector where wastecollector_id=${wid}`;
  console.log(strquery1);

  con.query(strquery1, (err, rows1) => {
    if (err)
      throw err;
    let lid = rows1[0].login_id;
    const query = `
    SELECT 
      c.collectiondetail_id,
      c.quantitycollected,
      c.wcategory,
      c.collecteddate,
      c.note,

      s.shopname,
      l.locationname,
      d.districtname,

      w.collectorname
    FROM tbl_collectiondetails c
    INNER JOIN tbl_shopowner s 
      ON c.owner_id = s.owner_id
    INNER JOIN tbl_location l 
      ON s.location_id = l.location_id
    INNER JOIN tbl_district d 
      ON l.district_id = d.district_id
    INNER JOIN tbl_wastecollector w
      ON w.login_id = c.wastecollector_id
    WHERE c.wastecollector_id = ? and c.collecteddate = '${date}'
    ORDER BY c.collecteddate DESC`;

    con.query(query, [lid], (err, rows) => {
      console.log(query,[lid])
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send(rows);
    });
  });
});
module.exports = router;