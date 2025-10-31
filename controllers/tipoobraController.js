const pool = require('../config/db');

async function getTipoObras(req, res) {
  try {
    const result = await pool.query('SELECT * FROM TipoObra');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar tipo de obras:', error);
    res.status(500).json({ error: 'Erro ao buscar tipo de obras' });
  }
}

module.exports = { getTipoObras };
