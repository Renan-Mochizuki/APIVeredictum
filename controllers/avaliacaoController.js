const pool = require('../config/db');
const { get } = require('../routes/usuario');
const { validateData } = require('../utils/validation');

async function getAvaliacoes(req, res) {
  try {
    const result = await pool.query('SELECT * FROM Avaliacao');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliações' });
  }
}

async function getAvaliacaoById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Avaliacao WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar avaliação:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliação' });
  }
}

async function createAvaliacao(req, res) {
  const { usuario_id, obra_id, nota, comentario } = req.body;
  try {
    const result = await pool.query('INSERT INTO Avaliacao (usuario_id, obra_id, nota, comentario) VALUES ($1, $2, $3, $4) RETURNING *', [usuario_id, obra_id, nota, comentario]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    res.status(500).json({ error: 'Erro ao criar avaliação' });
  }
}

module.exports = { getAvaliacoes, getAvaliacaoById, createAvaliacao };