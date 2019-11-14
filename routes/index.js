var express = require('express');
var db = require('../database/dbQuery.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Test for getting first and last names
  db.getUserFirstNameAndLastName("dominicpham").then(rows => {
    res.send(rows)
  });
});

module.exports = router;
