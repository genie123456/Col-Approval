const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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


app.get('/get', (req, res) => {
    res.send("working");
});

app.post('/signup', async (req, res) => {
    const { username, email, phoneNumber, password, type } = req.body; 

    try {
        // Check if user already exists
        const userExists = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (userExists.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Insert new user into the database
        await pool.query('INSERT INTO users (username, email, phone_number, password, type) VALUES (?, ?, ?, ?, ?)', [username, email, phoneNumber, password, type]); 

        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password, type } = req.body;
  
    try {
      // Check if user exists with the provided type
      const user = await pool.query('SELECT * FROM users WHERE username = ? AND type = ?', [username, type]);
  
      if (user.length === 0) {
        return res.status(401).json({ error: 'Invalid username, password, or type' });
      }
  
      // Check if password matches
      if (user[0].password !== password) {
        return res.status(401).json({ error: 'Invalid username, password, or type' });
      }
  
      res.status(200).json({ message: 'Login successful', user: { ...user[0], type: user[0].type } });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/officials', async (req, res) => {
    try {
        const connection = await pool.getConnection(); // Get a connection from the pool
        const results = await connection.query('SELECT id, username, type,  email, phone_number FROM users'); // Execute the query with necessary fields
        connection.release(); // Release the connection back to the pool

        res.json(results);
    } catch (error) {
        console.error('Error fetching officials data:', error);
        res.status(500).send('Error fetching officials data');
    }
});

// Start the server
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});