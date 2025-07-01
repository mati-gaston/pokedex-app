// Cargar las variables de entorno
require('dotenv').config();

const mysql = require('mysql2');

// Crear el pool de conexión usando variables del .env
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

pool.getConnection((err, connection) => {
  if (err) {
   } else {
    connection.release();
  }
});

module.exports = pool;

