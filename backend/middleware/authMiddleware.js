const jwt = require('jsonwebtoken');

const SECRET_KEY = 'mi_clave_secreta'; // Usá la misma que en el login

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.usuario = decoded; // Lo guardamos para usarlo en la ruta
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }
};

module.exports = verificarToken;
