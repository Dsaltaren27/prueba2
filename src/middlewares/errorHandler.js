function errorHandler(err, req, res, next) {
  // Loguear el error internamente
  console.error(`[ERROR] ${err.message}`);
  console.error(err.stack);

  // Errores que nosotros lanzamos intencionalmente
  if (err.statusCode) {
    return res.status(err.statusCode).json({ 
      error: err.message 
    });
  }

  // Error inesperado — no exponer detalles
  res.status(500).json({ 
    error: 'Error interno del servidor' 
  });
}

module.exports = { errorHandler };