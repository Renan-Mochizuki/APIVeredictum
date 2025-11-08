const pool = require('../config/db');

const itemName = 'pais';
const itemNamePlural = 'paises';

async function getPaises(req, res) {
  try {
    const result = await pool.query('SELECT * FROM PaisOrigem');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar ' + itemNamePlural + ':', error);
    res.status(500).json({ error: 'Erro ao buscar ' + itemNamePlural });
  }
}

module.exports = { getPaises };
