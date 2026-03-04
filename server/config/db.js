const mysql = require('mysql2');
require('dotenv').config();

// Create Connection Pool (Better performance for multiple users)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const db = pool.promise();

const connectDB = async () => {
    try {
        await db.query('SELECT 1');
        console.log('✅ MySQL Database Connected Successfully (Direct SQL)!');
    } catch (error) {
        console.error('❌ Database Connection Failed:', error);
    }
};

module.exports = { db, connectDB };