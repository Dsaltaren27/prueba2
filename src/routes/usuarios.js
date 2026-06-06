const express = require('express');
const router = express.Router();
const { getUsuarios, getUsuarioById, createUsuario } = require('../controllers/usuarios');
const { validarUsuario } = require('../middlewares/validar');
const { verificarToken } = require('../middlewares/auth');


router.get('/', verificarToken,getUsuarios);
router.get('/:id',verificarToken, getUsuarioById);
router.post('/', verificarToken, validarUsuario, createUsuario);

module.exports = router;