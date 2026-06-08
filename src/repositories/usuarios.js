const { pool } = require('../config/db');

async function findAll() {
  const resultado = await pool.query(
    'SELECT id, nombre, email, created_at FROM usuarios'
  );
  return resultado.rows;
}

async function findById(id) {
  const resultado = await pool.query(
    'SELECT id, nombre, email, created_at FROM usuarios WHERE id = $1',
    [id]
  );
  return resultado.rows[0]; 
}

async function findByEmail(email) {
  const resultado = await pool.query(
    'SELECT * FROM usuarios WHERE email = $1',
    [email]
  );
  return resultado.rows[0];
}

async function create(nombre, email, password) {
  const resultado = await pool.query(
    `INSERT INTO usuarios (nombre, email, password) 
     VALUES ($1, $2, $3) 
     RETURNING id, nombre, email, created_at`,
    [nombre, email, password]
  );
  return resultado.rows[0];
}

module.exports = { findAll, findById, findByEmail, create };