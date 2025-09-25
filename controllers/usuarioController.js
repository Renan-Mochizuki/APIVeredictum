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

async function getUsuarioById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Usuario WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
}

module.exports = { getUsuarios, getUsuarioById };
