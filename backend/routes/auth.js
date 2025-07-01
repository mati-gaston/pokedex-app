const express = require('express');
const router = express.Router();
const { iniciarSesion } = require('../controllers/authController');

// Ruta POST para login
router.post('/login', iniciarSesion);

module.exports = router;
