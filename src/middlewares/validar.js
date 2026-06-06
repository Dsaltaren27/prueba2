const { z } = require('zod');

const usuarioSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido')
});

function validarUsuario(req, res, next) {
  const resultado = usuarioSchema.safeParse(req.body);
  
  if (!resultado.success) {
    return res.status(400).json({ 
      error: 'Datos inválidos',
      detalles: resultado.error.issues.map(e => ({
        campo: e.path[0],
        mensaje: e.message
      }))
    });
  }

  req.body = resultado.data; // datos limpios y validados
  next(); // todo ok, sigue al controller
}

module.exports = { validarUsuario };