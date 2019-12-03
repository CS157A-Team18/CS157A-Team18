var express = require('express');
var router = express.Router();
const db = require('../database/dbQuery.js');

router.get('/', function(req, res, next) {
    var recipeResponse = {
        name: "",
        likes: 0,
        dislikes: 0,
        vidURL: "",
        imgURL: "",
        ingredients: [],
        instructions: [],
        userLikedRecipe: 0,
        userDislikedRecipe: 0
    }

    const recipeId = req.query.recipe_id
    const uid = req.query.uid

    db.getIndividualRecipeAttributes(recipeId)
    .then(rows => {
      recipeResponse.name = rows[0].name
      recipeResponse.likes = rows[0].likes
      recipeResponse.dislikes = rows[0].dislikes
      recipeResponse.vidURL = rows[0].vid_url
      recipeResponse.imgURL = rows[0].img_url
      return db.getIndividualRecipeIngredients(recipeId)
    })
    .then(rows => {
        recipeResponse.ingredients = rows
        return db.getIndividualRecipeInstructions(recipeId)
    })
    .then(rows => {
        recipeResponse.instructions = rows
        return db.checkIfUserLikedRecipe(uid)
    })
    .then(rows => {
        recipeResponse.userLikedRecipe = rows[0].liked_recipe
        return db.checkIfUserDislikedRecipe(uid)
    })
    .then(rows => {
        recipeResponse.userDislikedRecipe = rows[0].disliked_recipe
        console.log(recipeResponse)
        res.send(recipeResponse)
    })
    .catch(err => {
      console.log(err)
      console.log(recipeResponse)
      res.sendStatus(500)
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