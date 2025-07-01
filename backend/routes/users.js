const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const verificarToken = require('../middleware/authMiddleware');

//  Obtener todos los usuarios
router.get('/', verificarToken, (req, res) => {
  db.query('SELECT id, nombre, email, rol FROM usuarios', (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    res.json(resultados);
  });
});

//  Crear nuevo usuario
router.post('/', verificarToken, (req, res) => {
  const { nombre, email, password, rol } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ mensaje: 'Error al encriptar contraseña' });

    db.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, hash, rol],
      (err, resultado) => {
        if (err) return res.status(500).json({ mensaje: 'Error al crear usuario' });
        res.status(201).json({ mensaje: 'Usuario creado correctamente' });
      }
    );
  });
});

//  Actualizar usuario
router.put('/:id', verificarToken, (req, res) => {
  const { nombre, email, rol } = req.body;
  const { id } = req.params;

  db.query(
    'UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?',
    [nombre, email, rol, id],
    (err, resultado) => {
      if (err) return res.status(500).json({ mensaje: 'Error al actualizar usuario' });
      res.json({ mensaje: 'Usuario actualizado correctamente' });
    }
  );
});

//  Eliminar usuario
router.delete('/:id', verificarToken, (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, resultado) => {
    if (err) return res.status(500).json({ mensaje: 'Error al eliminar usuario' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  });
});

module.exports = router;
