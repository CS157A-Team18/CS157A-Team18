var express = require('express');
var db = require('../database/dbQuery.js');
var router = express.Router();
const util = require('util');


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
  var uid = "9BAqi1tAR3VUyGrRzB3vByw5COf1"
  var recipeName = util.format('Recipe%s', makeID(10))
  var vidURL = "someurl.com"
  var picURL = "somepicurl.com"

  var ingredientArray = []
  var ingredient = {
    name: util.format('Ingredient%s', makeID(10)),
    measurement: "cup",
    quantity: 1
  }

  var ingredient1 = {
    name: 'Random',
    measurement: "oz",
    quantity: 3
  }

  ingredientArray.push(ingredient)
  ingredientArray.push(ingredient1)

  var instructionArray = []
  var instruction = {
    instruction: util.format('Instruction%s', makeID(10)),
    order: 1
  }

  var instruction2 = {
    instruction: "Whisk the eggs",
    order: 2
  }

  instructionArray.push(instruction)
  instructionArray.push(instruction2)

  var mealTypeArray = [1, 4, 5]
  db.addRecipe(uid, recipeName, ingredientArray, instructionArray, mealTypeArray, vidURL, picURL).then(() => {
    res.send({
      uid: uid,
      recipeName: recipeName,
      vidURL: vidURL,
      picURL: picURL,
      ingredientArray: ingredientArray,
      instructionArray: instructionArray,
      mealTypeArray: mealTypeArray,
    })
  })
});

module.exports = router;
