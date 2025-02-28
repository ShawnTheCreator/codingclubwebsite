const bcrypt = require('bcryptjs');
const connection = require('../config/db');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  connection.query(checkQuery, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    connection.query(query, [name, email, hashedPassword], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
    });
  });
};
