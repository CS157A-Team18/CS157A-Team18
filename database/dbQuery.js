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

module.exports = { 
    addUser, 
    getUserFirstNameAndLastName,
    editPersonalInformation,
    getPersonalInformation,
    addRecipe
}