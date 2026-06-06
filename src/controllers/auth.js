const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRET } = require('../middlewares/auth');

// Base de datos simulada — después conectamos PostgreSQL
const usuariosDB = [
  {
    id: 1,
    nombre: 'Ana',
    email: 'ana@email.com',
    // "password123" hasheada con bcrypt
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
  }
];

async function login(req, res) {
  const { email, password } = req.body;

  // 1. Buscar usuario
  const usuario = usuariosDB.find(u => u.email === email);
  if (!usuario) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  // 2. Verificar password
  const passwordValida = await bcrypt.compare(password, usuario.password);
  if (!passwordValida) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  // 3. Generar token
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, nombre: usuario.nombre },
    SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre } });
}

async function registro(req, res) {
  const { nombre, email, password } = req.body;

  // Verificar si ya existe
  const existe = usuariosDB.find(u => u.email === email);
  if (existe) {
    return res.status(409).json({ error: 'El email ya está registrado' });
  }

  // Hashear password
  const hash = await bcrypt.hash(password, 10);

  const nuevoUsuario = {
    id: usuariosDB.length + 1,
    nombre,
    email,
    password: hash
  };

  usuariosDB.push(nuevoUsuario);

  const token = jwt.sign(
    { id: nuevoUsuario.id, email: nuevoUsuario.email, nombre: nuevoUsuario.nombre },
    SECRET,
    { expiresIn: '1h' }
  );

  res.status(201).json({ 
    token, 
    usuario: { id: nuevoUsuario.id, nombre: nuevoUsuario.nombre } 
  });
}

module.exports = { login, registro };