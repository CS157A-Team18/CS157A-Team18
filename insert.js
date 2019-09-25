var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'horkimleng1',
    password: 'kimleng12',
    database: 'cs157a',
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!")
});

connection.query('SELECT * FROM emp', function(err, result, fields) {
    if (err) throw err;
    res
})


