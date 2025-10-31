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
  // expected fields: numero, dataLancamento, titulo, descricao, temporadaId
  const { numero, dataLancamento, titulo, descricao, temporadaId } = req.body;
  try {
    const result = await pool.query('INSERT INTO Episodio (episNumero, episDataLancamento, episTitulo, episDescricao, episTemporadaId) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
      numero,
      dataLancamento || null,
      titulo,
      descricao || null,
      temporadaId,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar episódio:', error);
    res.status(500).json({ error: 'Erro ao criar episódio' });
  }
}

async function updateEpisodio(req, res) {
  const { id } = req.params;
  const { numero, dataLancamento, titulo, descricao, temporadaId } = req.body;

  if (!numero && !dataLancamento && !titulo && !descricao && !temporadaId) {
    return res.status(400).json({ error: 'Nenhum dado para atualizar' });
  }

  try {
    const updates = [];
    const values = [];
    let idx = 1;
    if (numero !== undefined) {
      updates.push(`episNumero = $${idx++}`);
      values.push(numero);
    }
    if (dataLancamento !== undefined) {
      updates.push(`episDataLancamento = $${idx++}`);
      values.push(dataLancamento);
    }
    if (titulo !== undefined) {
      updates.push(`episTitulo = $${idx++}`);
      values.push(titulo);
    }
    if (descricao !== undefined) {
      updates.push(`episDescricao = $${idx++}`);
      values.push(descricao);
    }
    if (temporadaId !== undefined) {
      updates.push(`episTemporadaId = $${idx++}`);
      values.push(temporadaId);
    }

    values.push(id);
    const query = `UPDATE Episodio SET ${updates.join(', ')} WHERE episId = $${idx} RETURNING *`;
    const result = await pool.query(query, values);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Episódio não encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar episódio:', error);
    res.status(500).json({ error: 'Erro ao atualizar episódio' });
  }
}

async function deleteEpisodio(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM Episodio WHERE episId = $1 RETURNING *', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Episódio não encontrado' });
    res.json({ message: 'Episódio deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar episódio:', error);
    res.status(500).json({ error: 'Erro ao deletar episódio' });
  }
}

module.exports = { getEpisodios, getEpisodioById, createEpisodio, updateEpisodio, deleteEpisodio };
