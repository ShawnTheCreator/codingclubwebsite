const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { Pool } = require('pg');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: 'https://crashcoders.netlify.app', // ✅ Ensure this is correct
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // 🔥 Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions)); // ✅ Apply CORS globally
app.options('*', cors(corsOptions)); // ✅ Handle preflight requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Routes
app.use('/auth', authRoutes);

// Test database connection
app.get('/check-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'Connected', timestamp: result.rows[0].now });
  } catch (error) {
    console.error('Database connection error:', error.message);
    res.status(500).json({ status: 'Error', error: error.message });
  }
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
