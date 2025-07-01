const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'mi_clave_secreta';

/**
 * Controlador para iniciar sesión.
 * Busca el usuario por email, compara contraseñas y genera un token JWT si todo es válido.
 */
const iniciarSesion = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error al buscar usuario:', err);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    const usuario = results[0];

    bcrypt.compare(password, usuario.password, (err, esValida) => {
      if (err) {
        console.error('Error al comparar contraseña:', err);
        return res.status(500).json({ mensaje: 'Error interno' });
      }

      if (!esValida) {
        return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      }

      // Si todo funciona ok, generamos el token
      const token = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email,
          rol: usuario.rol
        },
        SECRET_KEY,
        { expiresIn: '7d' }
      );

      return res.json({
        mensaje: 'Login exitoso',
        token,
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          rol: usuario.rol
        }
      });
    });
  });
};

module.exports = {
  iniciarSesion
};
