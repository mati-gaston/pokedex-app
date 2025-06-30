const mysql = require('mysql2');

// Crear el pool de conexión
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678', // Utiliza tu contraseña
  database: 'pokedexApp'
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
  } else {
    console.log('✅ Conexión a MySQL exitosa');
    connection.release();
  }
});

module.exports = pool;
