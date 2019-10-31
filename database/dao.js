const mysql = require( 'mysql' );
const config = require('../config/config.js')

class Database {
    constructor() {
        const con = mysql.createConnection({
            host: config.RDS_ENDPOINT,
            user: config.RDS_USERNAME,
            password: config.RDS_PASSWORD,
            database: config.RDS_DATABASE
        })
        
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected to RDS database")
        })

        this.connection = con;
    }
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

module.exports = {Database}