const pool = require('../config/db');
const { validateData } = require('../utils/validation');

const obraValidationRules = {
  titulo: { required: true, type: 'string', maxLength: 150 },
  descricao: { required: false, type: 'string', maxLength: 200 },
  tipoObraNome: { required: true, type: 'string', maxLength: 12 },
};

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
  try {
    const { isValid, errors } = validateData(req.body, obraValidationRules);
    if (!isValid) {
      return res.status(400).json({ error: `Dados inválidos: ${errors.join(', ')}` });
    }

    const { titulo, descricao, tipoObraNome } = req.body;

    const result = await pool.query('INSERT INTO Obra (obraTitulo, obraDescricao, obraTipoObraNome) VALUES ($1, $2, $3) RETURNING *', [titulo, descricao, tipoObraNome]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar obra:', error);
    res.status(500).json({ error: 'Erro ao criar obra' });
  }
}

async function updateObra(req, res) {
  const { id } = req.params;
}

module.exports = { getObraById, getObra, createObra };
