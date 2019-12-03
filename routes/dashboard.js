var express = require('express');
var router = express.Router();
const db = require('../database/dbQuery.js');

router.get('/', function(req, res, next) {
    var dashboardResponse = {
        firstName: "",
        lastName: "",
        allRecipes: []
    }

    db.getPersonalInformation(req.query.uid)
    .then(rows => {
      dashboardResponse.firstName = rows[0].first_name
      dashboardResponse.lastName = rows[0].last_name
    })
    .then(() => {
        return db.getAllRecipes()
    })
    .then(rows => {
        dashboardResponse.allRecipes = rows
    })
    .then(() => {
        res.send(dashboardResponse)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

module.exports = router;