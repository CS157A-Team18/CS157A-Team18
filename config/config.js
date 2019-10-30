const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    // RDS credentials
    RDS_ENDPOINT: process.env.RDS_ENDPOINT || "localhost",
    RDS_USERNAME: process.env.RDS_USERNAME || "root",
    RDS_PASSWORD: process.env.RDS_PASSWORD || "password",
    RDS_DATABASE: process.env.RDS_DATABASE || "cs172db",

    // Password encryption key
    AES_KEY: process.env.AES_KEY || "password",
}