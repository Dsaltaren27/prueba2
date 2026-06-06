const express = require('express');
const router = express.Router();
const { getUsuarios, getUsuarioById, createUsuario } = require('../controllers/usuarios');
const { validarUsuario } = require('../middlewares/validar');


router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', validarUsuario, createUsuario);

module.exports = router;