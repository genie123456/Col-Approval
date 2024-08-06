const mysql = require('mysql2');

// Database connection configuration
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cas',
    connectionLimit: 60
});

// Test database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MariaDB:', err);
        return;
    }
    console.log('Connected to MariaDB');
    connection.release();
});

module.exports = pool.promise(); // Use promise() to enable promise-based API
