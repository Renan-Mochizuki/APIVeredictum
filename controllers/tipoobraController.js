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

async function getTipoObraById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM TipoObra WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tipo de obra não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar tipo de obra:', error);
    res.status(500).json({ error: 'Erro ao buscar tipo de obra' });
  }
}

module.exports = { getTipoObras, getTipoObraById };
