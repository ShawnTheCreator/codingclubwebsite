const { Pool } = require("pg");
const dotenv = require("dotenv");


dotenv.config({ path: "C:/Users/HP/Desktop/Code Crashers/Backend/.env" });


console.log("Loaded Environment Variables:", {
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  DB_PASSWORD: process.env.DB_PASSWORD,
});


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
});


const initializeDatabase = async () => {
  try {
    const client = await pool.connect();


    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log(" Database tables initialized successfully!");
    client.release();
  } catch (err) {
    console.error(" Error initializing database:");
    console.error("Error Message:", err.message);
    console.error("Stack Trace:", err.stack);
    throw err;
  }
};


(async () => {
  try {
    await initializeDatabase();
    console.log("Database connection and initialization successful!");
  } catch (err) {
    console.error(" Error during database setup:", err);
  }
})();

module.exports = pool;
