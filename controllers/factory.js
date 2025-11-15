const pool = require('../config/db');
const { validateData } = require('../utils/validation');
const { constraintUnique } = require('../utils/constraint');

function basicCrudController({ table, idCol, itemName, itemNamePlural, fieldsCreate = [], fieldsUpdate = [], validationRulesCreate = {}, validationRulesUpdate = {} }) {
  async function getAll(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM ${table}`);
      res.json(result.rows);
    } catch (err) {
      console.error(`Erro ao buscar ${itemNamePlural}:`, err);
      res.status(500).json({ error: `Erro ao buscar ${itemNamePlural}` });
    }
  }

  async function getById(req, res) {
    try {
      const { id } = req.params;
      const result = await pool.query(`SELECT * FROM ${table} WHERE ${idCol} = $1`, [id]);
      if (result.rows.length === 0) return res.status(404).json({ error: `${itemName} não encontrado` });
      res.json(result.rows[0]);
    } catch (err) {
      console.error(`Erro ao buscar ${itemName}:`, err);
      res.status(500).json({ error: `Erro ao buscar ${itemName}` });
    }
  }

  async function createItem(req, res) {
    try {
      const { isValid, errors } = validateData(req.body, validationRulesCreate);

      if (!isValid) {
        return res.status(400).json({ error: `Dados inválidos: ${errors.join(', ')}` });
      }

      const cols = [];
      const placeholders = [];
      const values = [];

      fieldsCreate.forEach((f) => {
        const reqKey = typeof f === 'string' ? f : f.req;
        const col = typeof f === 'string' ? f : f.col;
        const val = req.body[reqKey];
        const isEmptyString = typeof val === 'string' && val.toString().trim() === '';

        if (typeof val !== 'undefined' && val !== null && !isEmptyString) {
          const rule = validationRulesCreate[reqKey];
          let toPush = val;
          if (rule && rule.type === 'number') {
            const num = Number(val);
            if (Number.isNaN(num)) return res.status(400).json({ error: `Campo '${reqKey}' deve ser um número` });
            toPush = num;
          }

          cols.push(col);
          placeholders.push(`$${values.length + 1}`);
          values.push(toPush);
        }
      });

      if (cols.length === 0) {
        return res.status(400).json({ error: 'Nenhum dado para inserir' });
      }

      const query = `INSERT INTO ${table} (${cols.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;
      const result = await pool.query(query, values);
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

  async function updateItem(req, res) {
    const { id } = req.params;

    try {
      const { isValid, errors } = validateData(req.body, validationRulesUpdate);
      if (!isValid) {
        return res.status(400).json({ error: `Dados inválidos: ${errors.join(', ')}` });
      }

      const updates = [];
      const values = [];

      fieldsUpdate.forEach((f) => {
        const reqKey = typeof f === 'string' ? f : f.req;
        const col = typeof f === 'string' ? f : f.col;
        const val = req.body[reqKey];
        const isEmptyString = typeof val === 'string' && val.toString().trim() === '';
        if (typeof val !== 'undefined' && val !== null && !isEmptyString) {
          // Coerce numbers when validation rule says so
          const rule = validationRulesUpdate[reqKey];
          let toPush = val;
          if (rule && rule.type === 'number') {
            const num = Number(val);
            if (Number.isNaN(num)) return res.status(400).json({ error: `Campo '${reqKey}' deve ser um número` });
            toPush = num;
          }

          updates.push(`${col} = $${values.length + 1}`);
          values.push(toPush);
        }
      });

      if (updates.length === 0) {
        return res.status(400).json({ error: 'Nenhum dado para atualizar' });
      }

      values.push(id);
      const query = `UPDATE ${table} SET ${updates.join(', ')} WHERE ${idCol} = $${values.length} RETURNING *`;
      const result = await pool.query(query, values);

      if (result.rowCount === 0) return res.status(404).json({ error: itemName + ' não encontrado' });

      res.json(result.rows[0]);
    } catch (error) {
      const constraintError = constraintUnique(error);
      if (constraintError) {
        return res.status(constraintError.status).json({ error: constraintError.message });
      }

      console.error('Erro ao atualizar ' + itemName + ':', error);
      res.status(500).json({ error: 'Erro ao atualizar ' + itemName });
    }
  }

  async function deleteItem(req, res) {
    const { id } = req.params;

    try {
      const result = await pool.query(`DELETE FROM ${table} WHERE ${idCol} = $1 RETURNING *`, [id]);

      if (result.rowCount === 0) return res.status(404).json({ error: itemName + ' não encontrado' });

      res.json({ message: itemName + ' deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar ' + itemName + ':', error);
      res.status(500).json({ error: 'Erro ao deletar ' + itemName });
    }
  }

  return { getAll, getById, createItem, updateItem, deleteItem };
}

module.exports = { basicCrudController };
