const pool = require('../config/db');
const { validateData } = require('../utils/validation');

async function getEpisodios(req, res) {
  try {
    const result = await pool.query('SELECT * FROM Episodio');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar episódios:', error);
    res.status(500).json({ error: 'Erro ao buscar episódios' });
  }
}

async function getEpisodioById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Episodio WHERE episId = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Episódio não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar episódio:', error);
    res.status(500).json({ error: 'Erro ao buscar episódio' });
  }
}

async function createEpisodio(req, res) {
  const { titulo, duracao, temporada_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO Episodio (titulo, duracao, temporada_id) VALUES ($1, $2, $3) RETURNING *',
      [titulo, duracao, temporada_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar episódio:', error);
    res.status(500).json({ error: 'Erro ao criar episódio' });
  }
}

module.exports = { getEpisodios, getEpisodioById, createEpisodio };