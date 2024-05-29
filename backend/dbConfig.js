const mariadb = require('mariadb');

// Database connection configuration
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cas',
    connectionLimit: 5
});

// Test database connection
pool.getConnection()
    .then(conn => {
        console.log('Connected to MariaDB');
        conn.release();
    })
    .catch(err => {
        console.error('Error connecting to MariaDB:', err);
    });

    module.exports = pool;