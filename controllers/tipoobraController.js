const pool = require('../config/db');

const itemName = 'tipo de obra';
const itemNamePlural = 'tipo de obras';

async function getTipoObras(req, res) {
  try {
    const result = await pool.query('SELECT * FROM TipoObra');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar ' + itemNamePlural + ':', error);
    res.status(500).json({ error: 'Erro ao buscar ' + itemNamePlural });
  }
}

module.exports = { getTipoObras };
