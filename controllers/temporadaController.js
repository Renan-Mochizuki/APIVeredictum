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
    const result = await pool.query('SELECT * FROM Temporada WHERE tempId = $1', [id]);
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
  // expected fields: numero, titulo, dataInicio, dataFim, descricao, obraId
  const { numero, titulo, dataInicio, dataFim, descricao, obraId } = req.body;
  try {
    const result = await pool.query('INSERT INTO Temporada (tempNumero, tempTitulo, tempDataInicio, tempDataFim, tempDescricao, tempObraId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
      numero,
      titulo || null,
      dataInicio || null,
      dataFim || null,
      descricao || null,
      obraId,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar temporada:', error);
    res.status(500).json({ error: 'Erro ao criar temporada' });
  }
}

async function updateTemporada(req, res) {
  const { id } = req.params;
  const { numero, titulo, dataInicio, dataFim, descricao, obraId } = req.body;

  if (!numero && !titulo && !dataInicio && !dataFim && !descricao && !obraId) {
    return res.status(400).json({ error: 'Nenhum dado para atualizar' });
  }

  try {
    const updates = [];
    const values = [];
    let idx = 1;

    if (numero !== undefined) {
      updates.push(`tempNumero = $${idx++}`);
      values.push(numero);
    }
    if (titulo !== undefined) {
      updates.push(`tempTitulo = $${idx++}`);
      values.push(titulo);
    }
    if (dataInicio !== undefined) {
      updates.push(`tempDataInicio = $${idx++}`);
      values.push(dataInicio);
    }
    if (dataFim !== undefined) {
      updates.push(`tempDataFim = $${idx++}`);
      values.push(dataFim);
    }
    if (descricao !== undefined) {
      updates.push(`tempDescricao = $${idx++}`);
      values.push(descricao);
    }
    if (obraId !== undefined) {
      updates.push(`tempObraId = $${idx++}`);
      values.push(obraId);
    }

    values.push(id);
    const query = `UPDATE Temporada SET ${updates.join(', ')} WHERE tempId = $${idx} RETURNING *`;
    const result = await pool.query(query, values);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Temporada não encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar temporada:', error);
    res.status(500).json({ error: 'Erro ao atualizar temporada' });
  }
}

async function deleteTemporada(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM Temporada WHERE tempId = $1 RETURNING *', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Temporada não encontrada' });
    res.json({ message: 'Temporada deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar temporada:', error);
    res.status(500).json({ error: 'Erro ao deletar temporada' });
  }
}

module.exports = { getTemporadas, getTemporadaById, createTemporada, updateTemporada, deleteTemporada };
