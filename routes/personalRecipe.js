var express = require('express');
var router = express.Router();
const db = require('../database/dbQuery.js');

router.get('/', function(req, res, next) {
    db.getUserRecipes(req.query.uid)
    .then(rows => {
      res.send(rows)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.delete('/', function(req, res, next) {
  console.log(req.body.id)
  db.deleteRecipe(req.body.id)
  .then(() => {
    res.sendStatus(200)
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
});

module.exports = router;