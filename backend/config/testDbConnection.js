// Import required modules
const { Pool } = require('pg');
const dotenv = require('dotenv'); // Make sure dotenv is imported
const fs = require('fs');

// Load environment variables from .env file
dotenv.config({ path: 'C:/Users/HP/Desktop/Code Crashers/Backend/.env' });  // Specify the correct path to your .env file

// Check if environment variables are loaded correctly
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);

// Create a new pool for connecting to the PostgreSQL database
const pool = new Pool({
  user: process.env.DB_USER,       // Your database user
  host: process.env.DB_HOST,       // AWS RDS endpoint
  database: process.env.DB_NAME,   // Your database name
  password: process.env.DB_PASS,   // Your database password
  port: process.env.DB_PORT,       // Database port (default is 5432)
});

// Test the connection
pool.connect()
  .then(() => {
    console.log('Connected to the database');
    pool.end();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });
