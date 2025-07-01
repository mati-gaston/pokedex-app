// Este archivo es un script auxiliar que inserta un usuario adminin en la BD manualmente sin tener que hacer todo el proceso desde la app
const bcrypt = require('bcryptjs');
const db = require('./db');

const nombre = 'Administrador';
const email = 'admin@mail.com';
const password = 'admin123';
const rol = 'admin';

// Función que se encarga de insertar el administrador en la base de datos
function insertarAdministrador(nombre, email, hash, rol) {
  const consulta = 'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)';
  db.query(consulta, [nombre, email, hash, rol], (error, resultado) => {
    if (error) {
      return console.error('❌ Error al insertar usuario:', error);
    }
    process.exit();
  });
}

// Función que hashea la contraseña y luego llama a la función para insertar
function crearHashDeContraseña(contraseña) {
  bcrypt.hash(contraseña, 10, (error, hashGenerado) => {
    if (error) {
      return console.error('❌ Error al hashear contraseña:', error);
    }
    insertarAdministrador(nombre, email, hashGenerado, rol);
  });
}

// Ejecutar función principal
crearHashDeContraseña(password);
