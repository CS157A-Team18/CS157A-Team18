var express = require('express');
var db = require('../database/dbQuery.js');
var router = express.Router();
const util = require('util');

/* GET home page. */
router.get('/', function(req, res, next) {
  /* Code for testing getUserCredentials() function. Replace 'bun' with any username
  *  in the DB and verify that the response is as expected
  */
  db.getUserCredentials('bun').then(rows => {
    if (rows.length == 0) {
      res.sendStatus(401)
      return
    }

    res.send(util.format('Password: %s', rows[0]['password']))
  })
});

module.exports = router;
