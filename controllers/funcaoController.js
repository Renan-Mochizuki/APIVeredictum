const pool = require('../config/db');
const { constraintUnique } = require('../utils/constraint');
const { validateData } = require('../utils/validation');

const itemName = 'função';
const itemNamePlural = 'funções';

async function getFuncoes(req, res) {
  try {
    const result = await pool.query('SELECT * FROM Funcao');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar ' + itemNamePlural + ':', error);
    res.status(500).json({ error: 'Erro ao buscar ' + itemNamePlural });
  }
}

async function createFuncao(req, res) {
  let { tipo } = req.body;

  const validationRules = {
    tipo: { required: true, type: 'string', minLength: 2, maxLength: 100 },
  };

  try {
    const { isValid, errors } = validateData(req.body, validationRules);

    if (!isValid) {
      return res.status(400).json({ error: `Dados inválidos: ${errors.join(', ')}` });
    }

    const result = await pool.query('INSERT INTO Funcao (funcTipo) VALUES ($1) RETURNING *', [tipo]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    const constraintError = constraintUnique(error);
    if (constraintError) {
      return res.status(constraintError.status).json({ error: constraintError.message });
    }

    console.error('Erro ao criar ' + itemName + ':', error);
    res.status(500).json({ error: 'Erro ao criar ' + itemName });
  }
}

// TODO: Implementar updateFuncao e deleteFuncao se necessário

module.exports = { getFuncoes, createFuncao };
