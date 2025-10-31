const pool = require('../config/db');

async function getCategorias(req, res) {
  try {
    const result = await pool.query('SELECT * FROM Categoria');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
}

module.exports = { getCategorias };
