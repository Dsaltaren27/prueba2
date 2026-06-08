const { AppError } = require('../utils/AppError');
const usuariosRepo = require('../repositories/usuarios');

async function getUsuarios(req, res, next) {
  try {
    const usuarios = await usuariosRepo.findAll();
    res.json({ usuarios });
  } catch (error) {
    next(error);
  }

}

async function getUsuarioById(req, res, next) {
  try {
    const usuario = await usuariosRepo.findById(Number(req.params.id));

    if (!usuario) throw new AppError('Usuario no encontrado', 404);
    res.json({ usuario });

  } catch (error) {
    next(error);
  }
}

async function createUsuario(req, res, next) {
  try {
    const { nombre, email, password } = req.body;

    const existe = await usuariosRepo.findByEmail(email);
    if (existe) throw new AppError('El email ya está registrado', 409);
    const nuevoUsuario = await usuariosRepo.create(nombre, email, password);
    res.status(201).json({ usuario: nuevoUsuario });
  } catch (error) {
    next(error);
  }
}

module.exports = { getUsuarios, getUsuarioById, createUsuario };