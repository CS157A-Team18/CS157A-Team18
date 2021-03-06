var express = require('express');
var router = express.Router();
const db = require('../database/dbQuery.js');

router.get('/', function(req, res, next) {
    db.getUserFavoritedRecipes(req.query.uid).then(rows => {
        res.send(rows)
    })
    .catch(err => {
        console.log(err)
    })
});

module.exports = router;

