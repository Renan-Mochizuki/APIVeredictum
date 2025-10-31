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

async function getCategoriaById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Categoria WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    res.status(500).json({ error: 'Erro ao buscar categoria' });
  }
}

module.exports = { getCategorias, getCategoriaById };
