const pool = require('../config/db');

const itemName = 'categoria';
const itemNamePlural = 'categorias';

async function getCategorias(req, res) {
  try {
    const result = await pool.query('SELECT * FROM Categoria');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar ' + itemNamePlural + ':', error);
    res.status(500).json({ error: 'Erro ao buscar ' + itemNamePlural });
  }
}

async function createCategoria(req, res) {
  let { nome } = req.body;

  const validationRules = {
    nome: { required: true, type: 'string', minLength: 3, maxLength: 30 },
  };

  try {
    const { isValid, errors } = validateData(req.body, validationRules);

    if (!isValid) {
      return res.status(400).json({ error: `Dados inválidos: ${errors.join(', ')}` });
    }
    
    const result = await pool.query('INSERT INTO Categoria (catNome) VALUES ($1) RETURNING *', [nome]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar ' + itemName + ':', error);
    res.status(500).json({ error: 'Erro ao criar ' + itemName });
  }
}

module.exports = { getCategorias };
