const { AppError } = require('../utils/AppError');

const usuarios = [
  { id: 1, nombre: 'Ana', email: 'ana@email.com' },
  { id: 2, nombre: 'Juan', email: 'juan@email.com' },
];

function getUsuarios(req, res) {
  res.json({ usuarios });
}

function getUsuarioById(req, res, next) {
  try {
    const usuario = usuarios.find(u => u.id === Number(req.params.id));
    
    if (!usuario) {
      throw new AppError('Usuario no encontrado', 404);
    }
    
    res.json({ usuario });
  } catch (error) {
    next(error);
  }
}

function createUsuario(req, res, next) {
  try {
    const { nombre, email } = req.body;
    
    const existe = usuarios.find(u => u.email === email);
    if (existe) {
      throw new AppError('El email ya está registrado', 409);
    }

    const nuevoUsuario = { id: usuarios.length + 1, nombre, email };
    usuarios.push(nuevoUsuario);
    res.status(201).json({ usuario: nuevoUsuario });
  } catch (error) {
    next(error);
  }
}

module.exports = { getUsuarios, getUsuarioById, createUsuario };