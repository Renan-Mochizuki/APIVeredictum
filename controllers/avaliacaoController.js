const pool = require('../config/db');
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

async function getAvaliacoesObras(req, res) {
  try {
    const result = await pool.query(`
      SELECT 
        u.usuaApelido AS Usuario,
        o.obraTitulo AS Obra,
        a.avalNota AS Nota,
        a.avalComentario AS Comentario
      FROM Avaliacao a
      JOIN Usuario u ON a.avalUsuarioId = u.usuaId
      JOIN Obra o ON a.avalObraId = o.obraId;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar avaliações de obras:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliações de obras' });
  }
}

async function createAvaliacao(req, res) {
  let { usuarioId, obraId, episodioId, nota, comentario } = req.body;

  const validationRules = {
    usuarioId: { required: true, type: 'number' },
    obraId: { required: false, type: 'number' },
    episodioId: { required: false, type: 'number' },
    nota: { required: true, type: 'number' },
    comentario: { required: false, type: 'string', maxLength: 500 },
  };

  if (!obraId && !episodioId) {
    return res.status(400).json({ error: 'É necessário avaliar uma obra ou um episódio' });
  }

  if(nota < 0 || nota > 10) {
    return res.status(400).json({ error: 'A nota deve estar entre 0 e 10' });
  }

  try {
    const { isValid, errors } = validateData(req.body, validationRules);
    if (!isValid) {
      return res.status(400).json({ error: `Dados inválidos: ${errors.join(', ')}` });
    }

    const result = await pool.query('INSERT INTO Avaliacao (avalUsuarioId, avalObraId, avalEpisodioId, avalNota, avalComentario) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
      usuarioId,
      obraId,
      episodioId,
      nota,
      comentario,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    res.status(500).json({ error: 'Erro ao criar avaliação' });
  }
}

async function updateAvaliacao(req, res) {
  const { id } = req.params;
  let { usuarioId, obraId, episodioId, nota, comentario } = req.body;

  const validationRules = {
    usuarioId: { required: false, type: 'number' },
    obraId: { required: false, type: 'number' },
    episodioId: { required: false, type: 'number' },
    nota: { required: false, type: 'number' },
    comentario: { required: false, type: 'string', maxLength: 500 },
  };

  if (!usuarioId && !obraId && !episodioId && !nota && !comentario) {
    return res.status(400).json({ error: 'Nenhum dado para atualizar' });
  }

  try {
    const { isValid, errors } = validateData(req.body, validationRules);
    if (!isValid) {
      return res.status(400).json({ error: `Dados inválidos: ${errors.join(', ')}` });
    }

    const updates = [];
    const values = [];
    let idx = 1;

    if (usuarioId) {
      updates.push(`avalUsuarioId = $${idx++}`);
      values.push(usuarioId);
    }
    if (obraId) {
      updates.push(`avalObraId = $${idx++}`);
      values.push(obraId);
    }
    if (episodioId) {
      updates.push(`avalEpisodioId = $${idx++}`);
      values.push(episodioId);
    }
    if (nota) {
      updates.push(`avalNota = $${idx++}`);
      values.push(nota);
    }
    if (comentario) {
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

module.exports = { getAvaliacoes, getAvaliacaoById, createAvaliacao, updateAvaliacao, deleteAvaliacao, getAvaliacoesObras };
