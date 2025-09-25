const pool = require('../config/db');

async function getUsuarios(req, res) {
  try {
    const result = await pool.query('SELECT * FROM Usuario');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
}

module.exports = { getUsuarios };
