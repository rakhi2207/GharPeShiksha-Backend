const db = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
const pool = db.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
})
module.exports = pool.promise();