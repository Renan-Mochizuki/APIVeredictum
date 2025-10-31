const pool = require('../config/db');
const { validateData } = require('../utils/validation');

const obraValidationRules = {
  titulo: { required: true, minLength: 1, maxLength: 200 },
  autor: { required: true, minLength: 2, maxLength: 100 },
  ano: {
    required: false,
    custom: (value) => {
      const n = parseInt(value, 10);
      if (isNaN(n)) return 'Ano deve ser um número';
      if (n < 0 || n > new Date().getFullYear()) return 'Ano inválido';
      return true;
    },
  },
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
    const result = await pool.query('SELECT * FROM Obra WHERE id = $1', [id]);
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

    const { titulo, autor, ano } = req.body;

    const result = await pool.query('INSERT INTO Obra (titulo, autor, ano) VALUES ($1, $2, $3) RETURNING *', [titulo, autor, ano || null]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar obra:', error);
    res.status(500).json({ error: 'Erro ao criar obra' });
  }
}

module.exports = { getObraById, getObra, createObra };
