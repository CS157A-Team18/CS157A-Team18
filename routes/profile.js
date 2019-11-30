var express = require('express');
var router = express.Router();
const db = require('../database/dbQuery.js');

router.get('/', function(req, res, next) {
    db.getPersonalInformation(req.query.uid)
    .then(rows => {
      res.send(rows[0])
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.post('/', function(req, res, next) {
    db.editPersonalInformation(req.body.uid, req.body.firstName, req.body.lastName)
    .then(() => {
      res.sendStatus(201) // 201 CREATED
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

module.exports = router;
