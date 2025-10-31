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

async function getPaisById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM PaisOrigem WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'País não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar país:', error);
    res.status(500).json({ error: 'Erro ao buscar país' });
  }
}

module.exports = { getPaises, getPaisById };
