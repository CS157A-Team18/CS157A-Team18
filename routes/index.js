var express = require('express');
var db = require('../database/dbQuery.js');
var router = express.Router();


function makeID(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/* GET home page. */
router.get('/', function (req, res, next) {
  // Test for getting personal information
  db.getPersonalInformation("dom").then(rows => {
    var response = {
      dataBefore: {
        username: rows[0].username,
        first_name: rows[0].first_name,
        last_name: rows[0].last_name
      },
      dataAfter: {
        username: "",
        first_name: "",
        last_name: ""
      }
    }

    // Test for changing personal information
    const randomFirstName = makeID(10)
    const randomLastName = makeID(10)
    
    db.editPersonalInformation("dom", randomFirstName, randomLastName)
    response.dataAfter.username = "dom"
    response.dataAfter.first_name = randomFirstName
    response.dataAfter.last_name = randomLastName
    res.send(response)
  });
  
});

module.exports = router;
