const express = require('express');
const cors = require('cors');
const session = require('express-session');
const pool = require('./dbConfig'); // Import the database connection pool
const crypto = require('crypto'); // Import the crypto module

const app = express();
const PORT = process.env.PORT || 3000;

// Generate a random secret key
const secretKey = crypto.randomBytes(64).toString('hex');

// Configure CORS
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));

// Configure JSON parsing middleware
app.use(express.json());

// Session middleware
app.use(session({
  secret: secretKey, // Use the generated secret key
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    sameSite: 'lax', // Add SameSite attribute
  },
}));

// Import routes
const formFieldRoutes = require('./formFields');

// Use routes
app.use('/', formFieldRoutes);

// Test route
app.get('/get', (req, res) => {
  res.send("working");
});

// Signup route
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

// Login route
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

    // Store user info in session
    req.session.user = user[0];

    res.status(200).json({ message: 'Login successful', user: { ...user[0], type: user[0].type } });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
});

// Profile route
app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
      res.status(401).json({ error: 'Not authenticated. Session destroyed.' });
    }
});

// Logout route
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// app.get('/officials', async (req, res) => {
//     let connection;
//     try {
//         connection = await pool.getConnection(); // Get a connection from the pool
//         const results = await connection.query('SELECT id, username, type, email, phone_number FROM users'); // Execute the query with necessary fields
//         res.json(results);
//     } catch (error) {
//         console.error('Error fetching officials data:', error);
//         res.status(500).send('Error fetching officials data');
//     } finally {
//         if (connection) connection.release(); // Release the connection back to the pool
//     }
// });

