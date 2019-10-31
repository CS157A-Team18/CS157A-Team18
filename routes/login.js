var express = require('express');
var router = express.Router();
const db = require('../database/dbQuery.js');
const config = require('../config/config.js');
const aes256 = require('aes256');

router.post('/', function(req, res, next) {
  db.getUserCredentials(req.body.username).then(rows => {
    // Case when user cannot be found in the DB
    if (rows.length == 0) {
      res.sendStatus(401)
      return
    }

    if (req.body.password != aes256.decrypt(config.AES_KEY, rows[0]["password"])) {
      res.sendStatus(401)
      return
    }
    
    // Handle successful login here
    res.sendStatus(200)
  })
});

router.use(function (err, req, res, next) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('404')
  }
});


module.exports = router;