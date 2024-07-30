const pool = require('../dbConfig');

exports.signup = async (req, res) => {
  const { username, email, phoneNumber, password, type } = req.body;

  let connection;
  try {
    connection = await pool.getConnection(); // Get a connection from the pool
    const userExists = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    if (userExists.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    await connection.query('INSERT INTO users (username, email, phone_number, password, type) VALUES (?, ?, ?, ?, ?)', [username, email, phoneNumber, password, type]);
    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
};

exports.login = async (req, res) => {
  const { username, password, type } = req.body;
  console.log('Received login data:', { username, password, type });
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Connection established');
    const [rows] = await connection.query(
      'SELECT * FROM users WHERE username = ? AND type = ? AND password = ?',
      [username, type, password]
    );
    console.log('Query result:', rows);
    console.log('Type received:', type);

    if (!Array.isArray(rows) || rows.length === 0) {
      console.log('Invalid username, password, or type');
      return res.status(401).json({ error: 'Invalid username, password, or type' });
    }

    const user = rows[0];
    console.log('User found:', user);

    req.session.user = user;
    console.log('Session user set:', req.session.user);
    res.status(200).json({ message: 'Login successful', user });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) connection.release();
  }
};

exports.profile = (req, res) => {
  console.log('Profile request received. Session:', req.session);
  if (req.session.user) {
    console.log('User in session:', req.session.user);
    res.status(200).json({ user: req.session.user });
  } else {
    console.log('No user in session. Returning 401.');
    res.status(401).json({ error: 'Not authenticated. Session destroyed.' });
  }
};   

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};