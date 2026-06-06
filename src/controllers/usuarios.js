const usuarios = [
  { id: 1, nombre: 'Ana', email: 'ana@email.com' },
  { id: 2, nombre: 'Juan', email: 'juan@email.com' },
];

function getUsuarios(req, res) {
  res.json({ usuarios });
}

function getUsuarioById(req, res) {
  const usuario = usuarios.find(u => u.id === Number(req.params.id));
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.json({ usuario });
}

function createUsuario(req, res) {
  const { nombre, email } = req.body;
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    email
  };
  usuarios.push(nuevoUsuario);
  res.status(201).json({ usuario: nuevoUsuario });
}

module.exports = { getUsuarios, getUsuarioById, createUsuario };