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
    const result = await pool.query('SELECT * FROM Avaliacao WHERE avalId = $1', [id]);
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
  // expected fields: usuarioId, obraId (optional), episodioId (optional), nota, comentario
  const { usuarioId, obraId, episodioId, nota, comentario } = req.body;
  try {
    const result = await pool.query('INSERT INTO Avaliacao (avalUsuarioId, avalObraId, avalEpisodioId, avalNota, avalComentario) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
      usuarioId,
      obraId || null,
      episodioId || null,
      nota,
      comentario || null,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    res.status(500).json({ error: 'Erro ao criar avaliação' });
  }
}

async function updateAvaliacao(req, res) {
  const { id } = req.params;
  const { usuarioId, obraId, episodioId, nota, comentario } = req.body;

  if (!usuarioId && !obraId && !episodioId && nota === undefined && comentario === undefined) {
    return res.status(400).json({ error: 'Nenhum dado para atualizar' });
  }

  try {
    const updates = [];
    const values = [];
    let idx = 1;
    if (usuarioId !== undefined) {
      updates.push(`avalUsuarioId = $${idx++}`);
      values.push(usuarioId);
    }
    if (obraId !== undefined) {
      updates.push(`avalObraId = $${idx++}`);
      values.push(obraId);
    }
    if (episodioId !== undefined) {
      updates.push(`avalEpisodioId = $${idx++}`);
      values.push(episodioId);
    }
    if (nota !== undefined) {
      updates.push(`avalNota = $${idx++}`);
      values.push(nota);
    }
    if (comentario !== undefined) {
      updates.push(`avalComentario = $${idx++}`);
      values.push(comentario);
    }

    values.push(id);
    const query = `UPDATE Avaliacao SET ${updates.join(', ')} WHERE avalId = $${idx} RETURNING *`;
    const result = await pool.query(query, values);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Avaliação não encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar avaliação:', error);
    res.status(500).json({ error: 'Erro ao atualizar avaliação' });
  }
}

async function deleteAvaliacao(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM Avaliacao WHERE avalId = $1 RETURNING *', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Avaliação não encontrada' });
    res.json({ message: 'Avaliação deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar avaliação:', error);
    res.status(500).json({ error: 'Erro ao deletar avaliação' });
  }
}

module.exports = { getAvaliacoes, getAvaliacaoById, createAvaliacao, updateAvaliacao, deleteAvaliacao };
