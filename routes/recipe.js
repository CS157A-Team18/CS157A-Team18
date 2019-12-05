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
        userDislikedRecipe: 0,
        userFavoritedRecipe: 0
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
        return db.checkIfUserLikedRecipe(uid, recipeId)
    })
    .then(rows => {
        recipeResponse.userLikedRecipe = rows[0].liked_recipe
        return db.checkIfUserDislikedRecipe(uid, recipeId)
    })
    .then(rows => {
        recipeResponse.userDislikedRecipe = rows[0].disliked_recipe
        return db.checkIfUserFavoritedRecipe(uid, recipeId)
    })
    .then(rows => {
      recipeResponse.userFavoritedRecipe = rows[0].favorited_recipe
      res.send(recipeResponse)
    })
    .catch(err => {
      console.log(err)
      console.log(recipeResponse)
      res.sendStatus(500)
    })
});

router.post('/editRecipe', function(req, res, next) {
  const recipeId = req.body.recipe_id
  const recipeName = req.body.recipeName
  const vidURL = req.body.tutorialLink
  const imgURL = req.body.pictureLink
  db.editRecipe(recipeId, recipeName, vidURL, imgURL).then(() => {
    res.sendStatus(200)
  })
});

router.post('/addIngredients', function(req, res, next) {
  db.addIngredients(req.body.recipe_id, req.body.addedIngredientData).then(() => {
    res.sendStatus(200)
  })
});

router.post('/editIngredients', function(req, res, next) {
  db.editIngredients(req.body.editedIngredientData).then(() => {
    res.sendStatus(200)
  })
});

router.delete('/delIngredients', function(req, res, next) {
  db.deleteIngredients(req.body.deletedIngredientData).then(() => {
    res.sendStatus(200)
  })
});

router.post('/addInstructions', function(req, res, next) {
  db.addInstructions(req.body.recipe_id, req.body.addedInstructionData).then(() => {
    res.sendStatus(200)
  })
});

router.post('/editInstructions', function(req, res, next) {
  db.editInstructions(req.body.editedInstructionData).then(() => {
    res.sendStatus(200)
  })
});

router.delete('/delInstructions', function(req, res, next) {
  db.deleteInstructions(req.body.deletedInstructionData).then(() => {
    res.sendStatus(200)
  })
});

router.post('/addLike', function(req, res, next) {
  db.addLikeToRecipe(req.body.uid, req.body.recipe_id).then(() => {
    res.sendStatus(200)
  })
});

router.delete('/delLike', function(req, res, next) {
  db.removeLikeFromRecipe(req.body.uid, req.body.recipe_id).then(() => {
    res.sendStatus(200)
  })
});

router.post('/addDislike', function(req, res, next) {
  db.addDislikeToRecipe(req.body.uid, req.body.recipe_id).then(() => {
    res.sendStatus(200)
  })
});

router.delete('/delDislike', function(req, res, next) {
  db.removeDislikeFromRecipe(req.body.uid, req.body.recipe_id).then(() => {
    res.sendStatus(200)
  })
});

router.post('/addFavorite', function(req, res, next) {
  db.addRecipeToFavorites(req.body.uid, req.body.recipe_id).then(() => {
    res.sendStatus(200)
  })
});

router.delete('/delFavorite', function(req, res, next) {
  db.removeRecipeFromFavorites(req.body.uid, req.body.recipe_id).then(() => {
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