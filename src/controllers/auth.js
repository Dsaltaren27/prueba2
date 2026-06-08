const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRET } = require('../middlewares/auth');
const usuariosRepo = require('../repositories/usuarios');

async function login(req, res, next) {
  try{
  const { email, password } = req.body;

  // 1. Buscar usuario
  const usuario = await usuariosRepo.findByEmail(email);
  if (!usuario) throw new AppError('Credenciales inválidas', 401);

  // 2. Verificar password
  const passwordValida = await bcrypt.compare(password, usuario.password);
  if (!passwordValida) throw new AppError('Credenciales inválidas', 401);
  

  // 3. Generar token
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, nombre: usuario.nombre },
    SECRET,
    { expiresIn: '1h' }
  );
  

  res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre } });
}
catch(error){
  next(error);
}

}
async function registro(req, res, next) {
  try{
  const { nombre, email, password } = req.body;

  // Verificar si ya existe
  const existe = await usuariosRepo.findByEmail(email);
  if (existe) throw new AppError('El email ya está registrado', 409);
    
  // Hashear password
  const hash = await bcrypt.hash(password, 10);
  // Crear usuario
  const nuevoUsuario = await usuariosRepo.create(nombre,email,hash);
  // Generar token
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
catch(error){
  next(error);
}
}
module.exports = { login, registro };