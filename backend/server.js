const express = require('express');
const cors = require('cors');
const session = require('express-session');
const pool = require('./dbConfig');  // Updated import to match the correct pool export
const MySQLStore = require('express-mysql-session')(session); 
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const formFieldsRoutes = require('./routes/formFields');
const fileUploadsRoute = require('./routes/fileUploads');
const masterRoutes = require('./routes/master');

const app = express();
const PORT = process.env.PORT || 3000;

// Generate a random secret key
const secretKey = crypto.randomBytes(64).toString('hex');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir);
    console.log('Created uploads directory');
  } catch (err) {
    console.error('Failed to create uploads directory:', err);
  }
} else {
  console.log('Uploads directory already exists');
}

// Configure CORS
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));

// Configure JSON parsing middleware
app.use(express.json());

// Session store configuration
const sessionStore = new MySQLStore({
  createDatabaseTable: true, // Ensure the session table is created if it does not exist
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
}, pool, {
  clearExpired: true,
  checkExpirationInterval: 900000, // How frequently expired sessions will be cleared; milliseconds.
  expiration: 86400000, // The maximum age of a valid session; milliseconds.
  createDatabaseTable: true, // Whether or not to create the sessions database table, if one does not already exist.
  charset: 'utf8mb4_bin', // Charset used for the session table.
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
});

// Session middleware
app.use(session({
  key: 'session_id',
  secret: secretKey,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  rolling: true, // <-- Extend session expiration time on user activity
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}));

// Middleware to set correct MIME types for static files
app.use(async (req, res, next) => {
  if (req.path.startsWith('/officer1')) {
    const mimeModule = await import('mime');
    const mimeType = mimeModule.default.getType(req.path);
    if (mimeType) {
      res.type(mimeType);
    }
  }
  next();
});

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, '../frontend/dist/frontend')));

// Use the formFields route for form submissions
app.use('/formFields', formFieldsRoutes);
app.use('/fileUploads', fileUploadsRoute);
app.use('/master', masterRoutes)

app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('Session Data:', req.session);
  next();
});

app.get('/get', async (req, res) => {
  res.send('working');
});

// Signup route
app.post('/signup', async (req, res) => {
  const { username, email, phoneNumber, password, type } = req.body;
  let connection;
  try {
    connection = await pool.getConnection(); // Get a connection from the pool
    // Check if user already exists
    const [userExists] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
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
    connection = await pool.getConnection();
    const [user] = await connection.query('SELECT * FROM users WHERE username = ? AND type = ?', [username, type]);
    if (user.length === 0) {
      return res.status(401).json({ error: 'Username does not Exists' });
    }
    if (user[0].password !== password) {
      return res.status(401).json({ error: 'Invalid username, password, or type' });
    }
    req.session.user = user[0];
    console.log('Session set:', req.session); // Debugging line
    res.status(200).json({ message: 'Login successful', user: { ...user[0], type: user[0].type } });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) connection.release();
  }
});


// Profile route
app.get('/profile', (req, res) => {
  console.log('Session:', req.session); // Debugging line
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    req.session.destroy(); // Ensure the session is destroyed if it exists but is unauthorized
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

app.get('*', (req, res) => {
  if (!req.path.startsWith('/officer1') && !req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../frontend/dist/frontend/index.html'));
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
