const pool = require('../config/db');
const { validateData } = require('../utils/validation');

const itemName = 'temporada';
const itemNamePlural = 'temporadas';

async function getTemporadas(req, res) {
  try {
    const result = await pool.query('SELECT * FROM Temporada');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar ' + itemNamePlural + ':', error);
    res.status(500).json({ error: 'Erro ao buscar ' + itemNamePlural });
  }
}

async function getTemporadaById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Temporada WHERE tempId = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: itemName + ' não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar ' + itemName + ':', error);
    res.status(500).json({ error: 'Erro ao buscar ' + itemName });
  }
}

async function createTemporada(req, res) {
  let { numero, titulo, dataInicio, dataFim, descricao, obraId } = req.body;

  const validationRules = {
    numero: { required: true, type: 'number' },
    titulo: { required: false, type: 'string', maxLength: 100 },
    // TODO Validar data
    // dataInicio: { required: false, type: 'string', format: 'date' },
    // dataFim: { required: false, type: 'string', format: 'date' },
    descricao: { required: false, type: 'string', maxLength: 150 },
    obraId: { required: true, type: 'number' },
  };

  try {
    const { isValid, errors } = validateData(req.body, validationRules);

    if (!isValid) {
      return res.status(400).json({ error: `Dados inválidos: ${errors.join(', ')}` });
    }

    const result = await pool.query('INSERT INTO Temporada (tempNumero, tempTitulo, tempDataInicio, tempDataFim, tempDescricao, tempObraId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
      numero,
      titulo,
      dataInicio,
      dataFim,
      descricao,
      obraId,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar ' + itemName + ':', error);
    res.status(500).json({ error: 'Erro ao criar ' + itemName });
  }
}

async function updateTemporada(req, res) {
  const { id } = req.params;
  let { numero, titulo, dataInicio, dataFim, descricao, obraId } = req.body;

  const validationRules = {
    numero: { required: false, type: 'number' },
    titulo: { required: false, type: 'string', maxLength: 100 },
    // TODO Validar data
    // dataInicio: { required: false, type: 'string', format: 'date' },
    // dataFim: { required: false, type: 'string', format: 'date' },
    descricao: { required: false, type: 'string', maxLength: 150 },
    obraId: { required: false, type: 'number' },
  };

  if (!numero && !titulo && !dataInicio && !dataFim && !descricao && !obraId) {
    return res.status(400).json({ error: 'Nenhum dado para atualizar' });
  }

  try {
    const updates = [];
    const values = [];
    let idx = 1;

    if (numero) {
      updates.push(`tempNumero = $${idx++}`);
      values.push(numero);
    }
    if (titulo) {
      updates.push(`tempTitulo = $${idx++}`);
      values.push(titulo);
    }
    if (dataInicio) {
      updates.push(`tempDataInicio = $${idx++}`);
      values.push(dataInicio);
    }
    if (dataFim) {
      updates.push(`tempDataFim = $${idx++}`);
      values.push(dataFim);
    }
    if (descricao) {
      updates.push(`tempDescricao = $${idx++}`);
      values.push(descricao);
    }
    if (obraId) {
      updates.push(`tempObraId = $${idx++}`);
      values.push(obraId);
    }

    values.push(id);

    const query = `UPDATE Temporada SET ${updates.join(', ')} WHERE tempId = $${idx} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rowCount === 0) return res.status(404).json({ error: itemName + ' não encontrada' });

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar ' + itemName + ':', error);
    res.status(500).json({ error: 'Erro ao atualizar ' + itemName });
  }
}

async function deleteTemporada(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM Temporada WHERE tempId = $1 RETURNING *', [id]);

    if (result.rowCount === 0) return res.status(404).json({ error: itemName + ' não encontrada' });

    res.json({ message: itemName + ' deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar ' + itemName + ':', error);
    res.status(500).json({ error: 'Erro ao deletar ' + itemName });
  }
}

module.exports = { getTemporadas, getTemporadaById, createTemporada, updateTemporada, deleteTemporada };
