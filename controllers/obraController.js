const pool = require('../config/db');
const { validateData } = require('../utils/validation');

async function getObra(req, res) {
  try {
    const result = await pool.query('SELECT * FROM Obra');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar obras:', error);
    res.status(500).json({ error: 'Erro ao buscar obras' });
  }
}

async function getObraById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Obra WHERE obraId = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Obra não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar obra:', error);
    res.status(500).json({ error: 'Erro ao buscar obra' });
  }
}

async function createObra(req, res) {
  let { titulo, descricao, tipoObraNome } = req.body;

  const validationRules = {
    titulo: { required: true, type: 'string', minLength: 2, maxLength: 150 },
    descricao: { required: false, type: 'string', maxLength: 200 },
    tipoObraNome: { required: true, type: 'string', minLength: 4, maxLength: 12 },
  };

  try {
    const { isValid, errors } = validateData(req.body, validationRules);

    if (!isValid) {
      return res.status(400).json({ error: `Dados inválidos: ${errors.join(', ')}` });
    }

    // Verificando se o tipo de obra existe para retornar uma mensagem de erro ao usuário
    const tipoObraNomeExiste = await pool.query('SELECT * FROM TipoObra WHERE tipoNome = $1', [tipoObraNome]);

    if (tipoObraNomeExiste.rows.length === 0) return res.status(400).json({ error: 'Tipo de obra inválido' });

    const result = await pool.query('INSERT INTO Obra (obraTitulo, obraDescricao, obraTipoObraNome) VALUES ($1, $2, $3) RETURNING *', [titulo, descricao, tipoObraNome]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar obra:', error);
    res.status(500).json({ error: 'Erro ao criar obra' });
  }
}

async function updateObra(req, res) {
  const { id } = req.params;
  let { titulo, descricao, tipoObraNome } = req.body;

  const validationRules = {
    titulo: { required: false, type: 'string', minLength: 2, maxLength: 150 },
    descricao: { required: false, type: 'string', maxLength: 200 },
    tipoObraNome: { required: false, type: 'string', minLength: 4, maxLength: 12 },
  };

  if (!titulo && !descricao && !tipoObraNome) {
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

    if (titulo) {
      updates.push(`obraTitulo = $${idx++}`);
      values.push(titulo);
    }
    if (descricao) {
      updates.push(`obraDescricao = $${idx++}`);
      values.push(descricao);
    }
    if (tipoObraNome) {
      updates.push(`obraTipoObraNome = $${idx++}`);
      values.push(tipoObraNome);
    }

    values.push(id);

    const query = `UPDATE Obra SET ${updates.join(', ')} WHERE obraId = $${idx} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rowCount === 0) return res.status(404).json({ error: 'Obra não encontrada' });

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar obra:', error);
    res.status(500).json({ error: 'Erro ao atualizar obra' });
  }
}

async function deleteObra(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM Obra WHERE obraId = $1 RETURNING *', [id]);

    if (result.rowCount === 0) return res.status(404).json({ error: 'Obra não encontrada' });

    res.json({ message: 'Obra deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar obra:', error);
    res.status(500).json({ error: 'Erro ao deletar obra' });
  }
}

module.exports = { getObraById, getObra, createObra, updateObra, deleteObra };
