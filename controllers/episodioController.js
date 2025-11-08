const pool = require('../config/db');
const { validateData } = require('../utils/validation');

const itemName = 'episódio';
const itemNamePlural = 'episódios';

async function getEpisodios(req, res) {
  try {
    const result = await pool.query('SELECT * FROM Episodio');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar ' + itemNamePlural + ':', error);
    res.status(500).json({ error: 'Erro ao buscar ' + itemNamePlural });
  }
}

async function getEpisodioById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Episodio WHERE episId = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: itemName + ' não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar ' + itemName + ':', error);
    res.status(500).json({ error: 'Erro ao buscar ' + itemName });
  }
}

async function createEpisodio(req, res) {
  let { numero, dataLancamento, titulo, descricao, temporadaId } = req.body;

  const validationRules = {
    numero: { required: true, type: 'number' },
    // TODO Validar data
    // dataLancamento: { required: false, type: 'string', format: 'date' },
    titulo: { required: false, type: 'string', maxLength: 100 },
    descricao: { required: false, type: 'string', maxLength: 200 },
    temporadaId: { required: true, type: 'number' },
  };

  try {
    const { isValid, errors } = validateData(req.body, validationRules);
    if (!isValid) {
      return res.status(400).json({ error: `Dados inválidos: ${errors.join(', ')}` });
    }

    const result = await pool.query('INSERT INTO Episodio (episNumero, episDataLancamento, episTitulo, episDescricao, episTemporadaId) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
      numero,
      dataLancamento,
      titulo,
      descricao,
      temporadaId,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar ' + itemName + ':', error);
    res.status(500).json({ error: 'Erro ao criar ' + itemName });
  }
}

async function updateEpisodio(req, res) {
  const { id } = req.params;
  let { numero, dataLancamento, titulo, descricao, temporadaId } = req.body;

  const validationRules = {
    numero: { required: false, type: 'number' },
    // TODO Validar data
    // dataLancamento: { required: false, type: 'string', format: 'date' },
    titulo: { required: false, type: 'string', maxLength: 100 },
    descricao: { required: false, type: 'string', maxLength: 200 },
    temporadaId: { required: false, type: 'number' },
  };

  if (!numero && !dataLancamento && !titulo && !descricao && !temporadaId) {
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

    if (numero) {
      updates.push(`episNumero = $${idx++}`);
      values.push(numero);
    }
    if (dataLancamento) {
      updates.push(`episDataLancamento = $${idx++}`);
      values.push(dataLancamento);
    }
    if (titulo) {
      updates.push(`episTitulo = $${idx++}`);
      values.push(titulo);
    }
    if (descricao) {
      updates.push(`episDescricao = $${idx++}`);
      values.push(descricao);
    }
    if (temporadaId) {
      updates.push(`episTemporadaId = $${idx++}`);
      values.push(temporadaId);
    }

    values.push(id);

    const query = `UPDATE Episodio SET ${updates.join(', ')} WHERE episId = $${idx} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rowCount === 0) return res.status(404).json({ error: itemName + ' não encontrado' });

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar ' + itemName + ':', error);
    res.status(500).json({ error: 'Erro ao atualizar ' + itemName });
  }
}

async function deleteEpisodio(req, res) {
  const { id } = req.params;
  
  try {
    const result = await pool.query('DELETE FROM Episodio WHERE episId = $1 RETURNING *', [id]);

    if (result.rowCount === 0) return res.status(404).json({ error: itemName + ' não encontrado' });

    res.json({ message: itemName + ' deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar ' + itemName + ':', error);
    res.status(500).json({ error: 'Erro ao deletar ' + itemName });
  }
}

module.exports = { getEpisodios, getEpisodioById, createEpisodio, updateEpisodio, deleteEpisodio };
