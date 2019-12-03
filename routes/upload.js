var express = require('express');
var router = express.Router();
const db = require('../database/dbQuery.js');

router.post('/', function(req, res, next) {
    const uid = req.body.uid
    const recipeName = req.body.recipeName
    const vidURL = req.body.vidURL
    const picURL = req.body.picURL
    const selectedMealTypes = req.body.selectedMealType
    const ingredientData = req.body.ingredientData
    const instructionData = req.body.instructionData

    db.addRecipe(uid, recipeName, ingredientData, instructionData, 
        selectedMealTypes, vidURL, picURL).then(() => {
            res.sendStatus(200)
        })
});

module.exports = router;
