const DAO = require('./dao.js');
const aes256 = require('aes256');
const config = require('../config/config.js');

var dbAccessObject = new DAO.Database()

function getUserCredentials(username) {
    const query = `SELECT password FROM user WHERE username = ?`
    return dbAccessObject.query(query, [username])
}

function addUser(username, firstName, lastName, password) {
    const query = `
        INSERT INTO user 
            VALUES(?, ?, ?, ?)
    `
    const encryptedPassword = aes256.encrypt(config.AES_KEY, password)
    return dbAccessObject.query(query, [username, firstName, lastName, encryptedPassword])
}

function getUserFirstNameAndLastName(username) {
    const query = `SELECT first_name, last_name FROM user WHERE username = ?`
    return dbAccessObject.query(query, [username])
}

function editPersonalInformation(username, firstName, lastName) {
    const query = `UPDATE user 
                    SET 
                        username = ?,
                        first_name = ?,
                        last_name = ?
                    WHERE username = ?`
    return dbAccessObject.query(query, [username, firstName, lastName, username])
}

function getPersonalInformation(username) {
    const query = `SELECT 
                    username, 
                    first_name, 
                    last_name 
                   FROM 
                    user 
                   WHERE 
                    username = ?`
    return dbAccessObject.query(query, [username])
}

module.exports = { 
    getUserCredentials, 
    addUser, 
    getUserFirstNameAndLastName,
    editPersonalInformation,
    getPersonalInformation
}