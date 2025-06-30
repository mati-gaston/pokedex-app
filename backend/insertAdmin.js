const bcrypt = require('bcryptjs');
const db = require('./db');

const nombre = 'Administrador';
const email = 'admin@mail.com';
const password = 'admin123';
const rol = 'admin';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    return console.error('❌ Error al hashear contraseña:', err);
  }

  const sql = 'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, email, hash, rol], (err, result) => {
    if (err) {
      return console.error('❌ Error al insertar usuario:', err);
    }

    console.log('✅ Usuario admin insertado correctamente');
    process.exit();
  });
});
