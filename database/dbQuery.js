const DAO = require('./dao.js')

var dbAccessObject = new DAO.Database()

function getUserCredentials(username) {
    const query = `SELECT password FROM user WHERE username = ?`
    return dbAccessObject.query(query, [username])
}

module.exports = {getUserCredentials}