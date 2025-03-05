const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

const router = express.Router();
router.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env");
}

// ✅ Secure CORS Configuration
const corsOptions = {
  origin: 'https://crashcoders.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
};

router.use(cors(corsOptions));
router.options('*', cors(corsOptions)); // Handle preflight requests

// ✅ Middleware to Authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Authorization required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// ✅ SIGNUP Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body; 

  try {
    const userExists = await pool.query('SELECT * FROM public.users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO public.users (name, email, password) VALUES ($1, $2, $3) RETURNING *', 
      [name, email, hashedPassword]
    );

    const { password: _, ...userWithoutPassword } = newUser.rows[0];

    res.status(201).json({ 
      message: 'User created successfully', 
      user: userWithoutPassword 
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error during signup.', details: err.message });
  }
});

// ✅ LOGIN Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM public.users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // ✅ Securely Set JWT in HTTP-Only Cookie
    res.cookie('token', token, {
      httpOnly: true,   // Prevent XSS
      secure: true,     // HTTPS only
      sameSite: 'Strict', // Prevent CSRF
      maxAge: 3600000   // 1 hour
    });

    const { password: _, ...userWithoutPassword } = user.rows[0];
    res.status(200).json({ 
      message: 'Login successful', 
      user: userWithoutPassword 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during login.' });
  }
});

// ✅ LOGOUT Route (Clears JWT Cookie)
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// ✅ DELETE ACCOUNT Route (Uses JWT)
router.delete('/delete-account', authenticateJWT, async (req, res) => {
  const { user } = req; // Get user from JWT

  try {
    const deleteResult = await pool.query('DELETE FROM public.users WHERE email = $1', [user.email]);
    if (deleteResult.rowCount > 0) {
      res.status(200).json({ message: 'Account successfully deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ message: 'Error deleting account' });
  }
});

module.exports = router;
