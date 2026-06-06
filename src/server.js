const express = require('express');
const cors = require('cors');

const usuariosRouter = require('./routes/usuarios');

const app = express();

// Middlewares globales
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json()); // parsea el body automáticamente

// Rutas
app.use('/usuarios', usuariosRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(3000, () => {
  console.log('Servidor Express corriendo en http://localhost:3000');
});