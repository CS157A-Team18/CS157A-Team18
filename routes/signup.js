var express = require('express');
var router = express.Router();
const db = require('../database/dbQuery.js');

router.post('/', function(req, res, next) {
    db.addUser(req.body.username, req.body.firstName, req.body.lastName, req.body.password)
    .then(() => {
      res.sendStatus(201) // 201 CREATED
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

module.exports = router;
