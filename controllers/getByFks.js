const pool = require('../config/db');
const { validateData } = require('../utils/validation');
const { constraints } = require('../utils/constraint');

function getByFks({ table, idCol, itemName, itemNamePlural, fkCol }) {
  async function getByFk(req, res) {
    try {
      const { id } = req.params;
      const result = await pool.query(`SELECT * FROM ${table} WHERE ${fkCol} = $1`, [id]);
      if (result.rows.length === 0) {
        const message = `${itemName} não encontrado`;
        res.status(404).json({ error: message });
        return { ok: false, status: 404, message };
      }
      res.json(result.rows);
      return { ok: true, status: 200, data: result.rows };
    } catch (err) {
      console.error(`Erro ao buscar ${itemName}:`, err);
      const message = `Erro ao buscar ${itemName}`;
      res.status(500).json({ error: message });
      return { ok: false, status: 500, message };
    }
  }

  return { getByFk };
}

module.exports = { getByFks };
