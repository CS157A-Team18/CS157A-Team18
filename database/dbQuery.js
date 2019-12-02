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
    for (let ingredient of ingredientArray) {
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
            addIngredientToIngredientRecipeJunctionTable(recipeId, ingredientId, ingredient.quantity, ingredient.measurement)
        })
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

function addInstructions(instructionArray, recipeId) {
    for (let instruction of instructionArray) {
        addInstructionToTable(instruction, recipeId)
    }
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

function getIndividualRecipeIngredients(recipeId) {
    const query = `SELECT 
	                ingredient.name, quantity, measurement
                   FROM ingredient
                   JOIN recipe_ingredient_junction_table ON id = ingredient_id
                   JOIN recipe ON recipe_id = recipe.id
                   WHERE recipe.id = ?`
    return dbAccessObject.query(query, [recipeId])
}

function getIndividualRecipeInstructions(recipeId) {
    const query = `SELECT 
	                instruction
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
    getAllRecipes
}