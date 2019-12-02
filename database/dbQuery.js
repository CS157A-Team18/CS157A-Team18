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

module.exports = { 
    addUser, 
    getUserFirstNameAndLastName,
    editPersonalInformation,
    getPersonalInformation
}