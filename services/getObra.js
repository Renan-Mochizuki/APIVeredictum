const pool = require('../config/db');

function getObra({ colunasGetTipo, tipoObra, itemNamePlural }) {
  async function getByTipoObra(req, res) {
    try {
      const result = await pool.query(`SELECT ${colunasGetTipo}, (SELECT ROUND(AVG(avalNota), 2) FROM Avaliacao WHERE avalObraId = obraId) AS obranota FROM Obra WHERE obratipoobranome = $1 ORDER BY obracreatedat DESC`, [tipoObra]);
      res.json(result.rows);
      return { ok: true, status: 200, data: result.rows };
    } catch (err) {
      console.error(`Erro ao buscar ${itemNamePlural}:`, err);
      const message = `Erro ao buscar ${itemNamePlural}`;
      res.status(500).json({ error: message });
      return { ok: false, status: 500, message };
    }
  }

  return { getByTipoObra };
}

module.exports = { getObra };
