const express = require('express');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/auth');
const verificarToken = require('./middleware/authMiddleware');
const userRoutes = require('./routes/users'); 

const app = express();


app.use(cors());
app.use(express.json());
app.use('/api/usuarios', userRoutes);

// Rutas públicas
app.use('/api', authRoutes);

// Ruta protegida
app.get('/api/protegido', verificarToken, (req, res) => {
  res.json({
    mensaje: `Accediste a una ruta protegida como ${req.usuario.rol}`,
    usuario: req.usuario
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

