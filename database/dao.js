const mysql = require( 'mysql' );

class Database {
    constructor() {
        const con = mysql.createConnection({
            host: process.env.RDS_ENDPOINT,
            user: process.env.RDS_USERNAME,
            password: process.env.RDS_PASSWORD,
            database: process.env.RDS_DATABASE
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