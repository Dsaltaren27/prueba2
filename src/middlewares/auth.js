const jwt = require('jsonwebtoken');

const SECRET = 'clave-secreta-desarrollo'; // en producción va en .env

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  // El header viene así: "Bearer eyJhbG..."
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Formato inválido. Usa: Bearer <token>' });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    req.usuario = payload; // disponible en el controller
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = { verificarToken, SECRET };