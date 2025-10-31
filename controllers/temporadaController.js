const pool = require('../config/db');
const { validateData } = require('../utils/validation');

async function getTemporadas(req, res) {
  try {
    const result = await pool.query('SELECT * FROM Temporada');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar temporadas:', error);
    res.status(500).json({ error: 'Erro ao buscar temporadas' });
  }
}

async function getTemporadaById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Temporada WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Temporada não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar temporada:', error);
    res.status(500).json({ error: 'Erro ao buscar temporada' });
  }
}

async function createTemporada(req, res) {
  const { numero, obra_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Temporada (numero, obra_id) VALUES ($1, $2) RETURNING *',
      [numero, obra_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar temporada:', error);
    res.status(500).json({ error: 'Erro ao criar temporada' });
  }
}

module.exports = { getTemporadas, getTemporadaById, createTemporada };
