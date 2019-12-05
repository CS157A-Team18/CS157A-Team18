const DAO = require('./dao.js');

var dbAccessObject = new DAO.Database()

function addUser(uid, firstName, lastName) {
    const query = `
        INSERT INTO user 
            VALUES(?, ?, ?)
    `
    return dbAccessObject.query(query, [uid, firstName, lastName])
}

function getUserFirstNameAndLastName(uid) {
    const query = `SELECT first_name, last_name FROM user WHERE uid = ?`
    return dbAccessObject.query(query, [uid])
}

function editPersonalInformation(uid, firstName, lastName) {
    const query = `UPDATE user 
                    SET 
                        first_name = ?,
                        last_name = ?
                    WHERE uid = ?`
    return dbAccessObject.query(query, [firstName, lastName, uid])
}

function getPersonalInformation(uid) {
    const query = `SELECT
                    first_name, 
                    last_name 
                   FROM 
                    user 
                   WHERE 
                    uid = ?`
    return dbAccessObject.query(query, [uid])
}

function addRecipe(uid, name, ingredientArray, instructionArray, mealTypeArray, vidURL, imgURL) {
    const query = `INSERT INTO recipe VALUES (NULL, ?, 0, 0, ?, ?)`
    return dbAccessObject.query(query, [name, vidURL, imgURL]).then(() => {
        return getRecipeId(name, vidURL, imgURL)
    })
        .then(rows => {
            const recipeId = rows[0].id
            addRecipeToUserRecipeUploadTable(uid, recipeId)
            addIngredients(recipeId, ingredientArray)
            addInstructions(instructionArray, recipeId)
            addRecipeMealType(recipeId, mealTypeArray)
        })
        .catch(err => {
            console.log(err)
        })
}

function getRecipeId(name, vidURL, imgURL) {
    const query = `SELECT id FROM recipe 
                    WHERE name = ? AND vid_url= ? AND img_url = ?`
    return dbAccessObject.query(query, [name, vidURL, imgURL])
}

function addRecipeToUserRecipeUploadTable(uid, recipeId) {
    const query = `INSERT INTO user_recipe_junction_table_uploads 
                    VALUES (?, ?)`
    return dbAccessObject.query(query, [uid, recipeId])
}

function addIngredients(recipeId, ingredientArray) {
    var promises = []
    for (let ingredient of ingredientArray) {
        promises.push(
            checkIfIngredientExists(ingredient.name.toUpperCase()).then(rows => {
                if (!rows[0].isInTable) {
                    addIngredientToTable(ingredient.name.toUpperCase())
                }
            })
            .then(() => {
                return getIngredientId(ingredient.name.toUpperCase())
            })
            .then(rows => {
                const ingredientId = rows[0].id
                addIngredientToIngredientRecipeJunctionTable(recipeId, ingredientId, ingredient.amount, ingredient.measurement)
            })
        )
        return Promise.all(promises)
    }
}

function checkIfIngredientExists(ingredientName) {
    const preCheckQuery = `SELECT COUNT(*) AS isInTable 
                                FROM ingredient WHERE name = ?`
    return dbAccessObject.query(preCheckQuery, [ingredientName])
}

function addIngredientToTable(ingredientName) {
    const query = `INSERT INTO ingredient VALUES (NULL, ?)`
    return dbAccessObject.query(query, [ingredientName])
}

function getIngredientId(ingredientName) {
    const query = `SELECT id FROM ingredient WHERE name = ?`
    return dbAccessObject.query(query, [ingredientName])
}

function addIngredientToIngredientRecipeJunctionTable(recipeId, ingredientId, quantity, measurement) {
    const query = `INSERT INTO recipe_ingredient_junction_table 
                    VALUES (?, ?, ?, ?)`
    return dbAccessObject.query(query, [recipeId, ingredientId, quantity, measurement.toUpperCase()])
}

function addInstructions(recipeId, instructionArray) {
    var promises = []
    for (var i = 0; i < instructionArray.length; i++) {
        instructionArray[i]["order"] = i + 1
        promises.push(addInstructionToTable(instructionArray[i], recipeId))
    }
    return Promise.all(promises)
}

function addInstructionToTable(instruction, recipeId) {
    const query = `INSERT INTO instruction VALUES (NULL, ?, ?, ?)`
    return dbAccessObject.query(query, [instruction.instruction, instruction.order, recipeId])
}

function addRecipeMealType(recipeId, mealTypeArray) {
    for (let mealType of mealTypeArray) {
        addMealTypeToRecipeMealTypeJunctionTable(recipeId, mealType)
    }
}

function addMealTypeToRecipeMealTypeJunctionTable(recipeId, mealType) {
    const query = `INSERT INTO recipe_meal_type_junction_table
                    VALUES (?, ?)`
    return dbAccessObject.query(query, [recipeId, mealType])
}

function getUserRecipes(uid) {
    const query = `SELECT 
                    id, name, likes, dislikes, img_url
                   FROM recipe
                   JOIN user_recipe_junction_table_uploads ON id = recipe_id
                   WHERE uid = ?`
    return dbAccessObject.query(query, [uid])
}

function getIndividualRecipeAttributes(recipeId) {
    const query = `SELECT 
                    name, likes, dislikes, vid_url, img_url 
                   FROM recipe 
                   WHERE id = ?`
    return dbAccessObject.query(query, [recipeId])
}

function getIndividualRecipeIngredients(recipeId) {
    const query = `SELECT 
	                ingredient.id, ingredient.name, quantity, measurement
                   FROM ingredient
                   JOIN recipe_ingredient_junction_table ON id = ingredient_id
                   JOIN recipe ON recipe_id = recipe.id
                   WHERE recipe.id = ?`
    return dbAccessObject.query(query, [recipeId])
}

function getIndividualRecipeInstructions(recipeId) {
    const query = `SELECT 
	                id, instruction
                   FROM instruction
                   WHERE recipe_id = ?
                   ORDER BY \`order\` ASC`
    return dbAccessObject.query(query, [recipeId])
}

function getInvididualRecipeMealTypes(recipeId) {
    const query = `SELECT 
	                meal_type_id, meal_type.name
                   FROM meal_type
                   JOIN recipe_meal_type_junction_table ON meal_type_id = meal_type.id
                   JOIN recipe ON recipe_id = recipe.id
                   WHERE recipe_id = ?`
    return dbAccessObject.query(query, [recipeId])
}

function getAllRecipes() {
    const query = `SELECT 
                    id, name, likes, dislikes, img_url
                   FROM recipe
                   JOIN user_recipe_junction_table_uploads ON id = recipe_id`
    return dbAccessObject.query(query)
}

function addLikeToRecipe(uid, recipeId) {
    const query = `INSERT INTO user_recipe_junction_table_likes VALUES (?, ?)`
    return dbAccessObject.query(query, [uid, recipeId]).then(() => {
        incrementRecipeLikes(recipeId)
    })
}

function incrementRecipeLikes(recipeId) {
    const query = `UPDATE recipe SET likes = likes + 1 WHERE id = ?`
    return dbAccessObject.query(query, [recipeId])
}

function addDislikeToRecipe(uid, recipeId) {
    const query = `INSERT INTO user_recipe_junction_table_dislikes VALUES (?, ?)`
    return dbAccessObject.query(query, [uid, recipeId]).then(() => {
        incrementRecipeDislikes(recipeId)
    })
}

function incrementRecipeDislikes(recipeId) {
    const query = `UPDATE recipe SET dislikes = dislikes + 1 WHERE id = ?`
    return dbAccessObject.query(query, [recipeId])
}

function removeLikeFromRecipe(uid, recipeId) {
    const query = `DELETE FROM user_recipe_junction_table_likes 
                   WHERE uid = ? AND recipe_id = ?`
    return dbAccessObject.query(query, [uid, recipeId]).then(() => {
        decrementRecipeLikes(recipeId)
    })
}

function decrementRecipeLikes(recipeId) {
    const query = `UPDATE recipe SET likes = likes - 1 WHERE id = ?`
    return dbAccessObject.query(query, [recipeId])
}

function removeDislikeFromRecipe(uid, recipeId) {
    const query = `DELETE FROM user_recipe_junction_table_dislikes 
                   WHERE uid = ? AND recipe_id = ?`
    return dbAccessObject.query(query, [uid, recipeId]).then(() => {
        decrementRecipeDislikes(recipeId)
    })
}

function decrementRecipeDislikes(recipeId) {
    const query = `UPDATE recipe SET dislikes = dislikes - 1 WHERE id = ?`
    return dbAccessObject.query(query, [recipeId])
}

function getUserLikedRecipes(uid) {
    const query = `SELECT
	                id, name, likes, dislikes
                   FROM user_recipe_junction_table_likes
                   JOIN recipe ON recipe_id = id
                   WHERE uid = ?`
    return dbAccessObject.query(query, [uid])
}

function checkIfUserLikedRecipe(uid, recipeId) {
    const query = `SELECT
	                COUNT(*) AS liked_recipe
                   FROM user_recipe_junction_table_likes
                   WHERE uid = ? AND recipe_id = ?`
    return dbAccessObject.query(query, [uid, recipeId])
}

function checkIfUserDislikedRecipe(uid, recipeId) {
    const query = `SELECT
	                COUNT(*) AS disliked_recipe
                   FROM user_recipe_junction_table_dislikes
                   WHERE uid = ? AND recipe_id = ?`
    return dbAccessObject.query(query, [uid, recipeId])
}

function deleteRecipe(recipeId) {
    const query = `DELETE FROM recipe WHERE id = ?`
    return dbAccessObject.query(query, [recipeId])
}

function getUserFavoritedRecipes(uid) {
    const query = `SELECT
	                id, name, likes, dislikes
                   FROM user_recipe_junction_table_favorites
                   JOIN recipe ON recipe_id = id
                   WHERE uid = ?`
    return dbAccessObject.query(query, [uid])
}

function addRecipeToFavorites(uid, recipeId) {
    const query = `INSERT INTO 
                    user_recipe_junction_table_favorites
                   VALUES (?, ?)`
    return dbAccessObject.query(query, [uid, recipeId])
}

function removeRecipeFromFavorites(uid, recipeId) {
    const query = `DELETE FROM user_recipe_junction_table_favorites 
                   WHERE uid = ? AND recipe_id = ?`
    return dbAccessObject.query(query, [uid, recipeId])
}

function checkIfUserFavoritedRecipe(uid, recipeId) {
    const query = `SELECT
	                COUNT(*) AS favorited_recipe
                   FROM user_recipe_junction_table_favorites
                   WHERE uid = ? AND recipe_id = ?`
    return dbAccessObject.query(query, [uid, recipeId])
}

function editRecipe(recipeId, name, vidURL, imgURL) {
    const query = `UPDATE recipe 
                    SET 
                        name = ?,
                        vid_url = ?,
                        img_url = ?
                    WHERE id = ?`
    return dbAccessObject.query(query, [name, vidURL, imgURL, recipeId])
}

function editIngredients(ingredientArray) {
    var promises = []
    for (let ingredient of ingredientArray) {
        promises.push(editIngredient(ingredient))
    }
    return Promise.all(promises)
}

function editIngredient(ingredient) {
    const query = `UPDATE ingredient 
                    SET 
                        name = ?
                    WHERE id = ?`
    return dbAccessObject.query(query, [ingredient.name, ingredient.id])
}

function deleteIngredients(ingredientsArray) {
    var promises = []
    for (let ingredient of ingredientsArray) {
        promises.push(deleteIngredient(ingredient))
    }
    return Promise.all(promises)
}

function deleteIngredient(ingredient) {
    const query = `DELETE FROM ingredient WHERE id = ?`
    return dbAccessObject.query(query, [ingredient.id])
}

function deleteInstructions(instructionArray) {
    var promises = []
    for (let instruction of instructionArray) {
        promises.push(deleteInstruction(instruction))
    }
    return Promise.all(promises)
}

function deleteInstruction(instruction) {
    const query = `DELETE FROM instruction WHERE id = ?`
    return dbAccessObject.query(query, [instruction.id])
}

function editInstructions(instructionArray) {
    var promises = []
    for (let instruction of instructionArray) {
        promises.push(editInstruction(instruction))
    }
    return Promise.all(promises)
}

function editInstruction(instruction) {
    const query = `UPDATE instruction 
                    SET 
                        instruction = ?
                    WHERE id = ?`
    return dbAccessObject.query(query, [instruction.instruction, instruction.id])
}

module.exports = {
    addUser,
    getUserFirstNameAndLastName,
    editPersonalInformation,
    getPersonalInformation,
    addRecipe,
    getUserRecipes,
    getIndividualRecipeIngredients,
    getIndividualRecipeInstructions,
    getInvididualRecipeMealTypes,
    getAllRecipes,
    addLikeToRecipe,
    addDislikeToRecipe,
    removeLikeFromRecipe,
    removeDislikeFromRecipe,
    getUserLikedRecipes,
    checkIfUserLikedRecipe,
    checkIfUserDislikedRecipe,
    deleteRecipe,
    getIndividualRecipeAttributes,
    getUserFavoritedRecipes,
    addRecipeToFavorites,
    removeRecipeFromFavorites,
    checkIfUserFavoritedRecipe,
    addIngredients,
    deleteIngredients,
    editIngredients,
    addInstructions,
    deleteInstructions,
    editInstructions,
    editRecipe
}