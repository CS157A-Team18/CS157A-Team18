var express = require('express');
var db = require('../database/dbQuery.js');
var router = express.Router();

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  // Test case for existing user. In this case, the MySQL will return a 'ER_DUP_ENTRY'
  // error since the username already exists and username is a primary key
  const existingUsername = 'bun'
  var testJSON = []
  db.addUser(existingUsername, 'test', 'test', 'password').catch(err => {
    testJSON.push({
      "test_case": "existing_user",
      "username": existingUsername,
      "expected_output": "ER_DUP_ENTRY",
      "actual_output": err.code
    });
  }).then(() => {
    // Test case for non-existing user. In this case, no error is outputted if successful.
    // Check DB to verify user has been created
    const randomUsername = makeid(10)
    db.addUser(randomUsername, 'test', 'test', 'password').then(() => {
      testJSON.push({
        "test_case": "new_user",
        "username": randomUsername,
        "expected_output": "",
        "actual_output": ""
      });
      res.json(testJSON)
    }).catch(err => {
      if (err) console.log(err)
    });
  });
});

module.exports = router;
