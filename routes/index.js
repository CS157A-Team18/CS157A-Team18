var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kimleng123$',
    database: 'cs157a',
  });
  
  connection.connect()
  
  connection.query('SELECT * FROM emp', function(err, rows, fields) {
    if (err) throw err

    var studentJson = []

    for(var i = 0; i < rows.length; i++) {
      studentJson.push({"id":rows[i]["id"], "name":rows[i]["name"], "age":rows[i]["age"]})
    }

    res.json(studentJson)
  })
  
  connection.end()
});

module.exports = router;
