var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var app = express()

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
    res.render('index', {title: "id: " + rows[0]["id"] + ", " 
    + "name: " + rows[0]["name"] + ", " 
    + "age:" + rows[0]["age"]})
  })
  
  connection.end()
});

module.exports = router;
