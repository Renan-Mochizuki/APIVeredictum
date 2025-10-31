const pool = require('../config/db');

async function getPaises(req, res) {
  try {
    const result = await pool.query('SELECT * FROM PaisOrigem');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar paises:', error);
    res.status(500).json({ error: 'Erro ao buscar paises' });
  }
}

module.exports = { getPaises };
