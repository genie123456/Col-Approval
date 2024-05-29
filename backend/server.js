const express = require('express');
const cors = require('cors');
const pool = require('./dbConfig'); // Import the database connection pool

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/get', (req, res) => {
    res.send("working");
});

app.post('/signup', async (req, res) => {
    const { username, email, phoneNumber, password, type } = req.body; 

    let connection;
    try {
        connection = await pool.getConnection(); // Get a connection from the pool

        // Check if user already exists
        const userExists = await connection.query('SELECT * FROM users WHERE username = ?', [username]);

        if (userExists.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Insert new user into the database
        await connection.query('INSERT INTO users (username, email, phone_number, password, type) VALUES (?, ?, ?, ?, ?)', [username, email, phoneNumber, password, type]);

        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
    }
});

app.post('/login', async (req, res) => {
    const { username, password, type } = req.body;
  
    let connection;
    try {
        connection = await pool.getConnection(); // Get a connection from the pool

        // Check if user exists with the provided type
        const user = await connection.query('SELECT * FROM users WHERE username = ? AND type = ?', [username, type]);

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
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
    }
});

app.get('/officials', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection(); // Get a connection from the pool
        const results = await connection.query('SELECT id, username, type, email, phone_number FROM users'); // Execute the query with necessary fields
        res.json(results);
    } catch (error) {
        console.error('Error fetching officials data:', error);
        res.status(500).send('Error fetching officials data');
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
