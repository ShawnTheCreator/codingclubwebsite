const { Pool } = require('pg');
const dotenv = require('dotenv'); 
const fs = require('fs');


dotenv.config({ path: 'C:/Users/HP/Desktop/Code Crashers/Backend/.env' }); 


console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);


const pool = new Pool({
  user: process.env.DB_USER,       
  host: process.env.DB_HOST,       
  database: process.env.DB_NAME,  
  password: process.env.DB_PASS,  
  port: process.env.DB_PORT,   
});


pool.connect()
  .then(() => {
    console.log('Connected to the database');
    pool.end();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });
