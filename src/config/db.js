const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'task_api',
  user: 'postgres',
  password: 'root', // la que pusiste al instalar
  max: 10,                       // máximo 10 conexiones simultáneas
  idleTimeoutMillis: 30000
});

// Verificar conexión al arrancar
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error conectando a PostgreSQL:', err.message);
  } else {
    console.log('PostgreSQL conectado correctamente');
    release();
  }
});

module.exports = { pool };