const pool = require('../config/db');
const { validateData } = require('../utils/validation');
const { constraints } = require('../utils/constraint');
const validateToken = require('./validateToken');

function basicCrudController({
  table,
  idCol,
  itemName,
  itemNamePlural,
  fieldsCreate = [],
  fieldsUpdate = [],
  fieldsDelete = [],
  validationRulesCreate = {},
  validationRulesUpdate = {},
  validationRulesDelete = {},
  userIdCol,
}) {
  async function getAll(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM ${table}`);
      res.json(result.rows);
      return { ok: true, status: 200, data: result.rows };
    } catch (err) {
      console.error(`Erro ao buscar ${itemNamePlural}:`, err);
      const message = `Erro ao buscar ${itemNamePlural}`;
      res.status(500).json({ error: message });
      return { ok: false, status: 500, message };
    }
  }

  async function getById(req, res) {
    try {
      const { id } = req.params;
      const result = await pool.query(`SELECT * FROM ${table} WHERE ${idCol} = $1`, [id]);
      if (result.rows.length === 0) {
        const message = `${itemName} não encontrado`;
        res.status(404).json({ error: message });
        return { ok: false, status: 404, message };
      }
      res.json(result.rows[0]);
      return { ok: true, status: 200, data: result.rows[0] };
    } catch (err) {
      console.error(`Erro ao buscar ${itemName}:`, err);
      const message = `Erro ao buscar ${itemName}`;
      res.status(500).json({ error: message });
      return { ok: false, status: 500, message };
    }
  }

  async function createItem(req, res) {
    try {
      const { isValid, errors } = validateData(req.body, validationRulesCreate);

      if (!isValid) {
        const message = `Dados inválidos: ${errors.join(', ')}`;
        res.status(400).json({ error: message });
        return { ok: false, status: 400, message };
      }

      const cols = [];
      const placeholders = [];
      const values = [];

      // TODO: Finalizar verificação da autoria
      let usuarioId = null;
      if (userIdCol) {
        // Verificação do Token
        const validatedId = await validateToken(req, res);
        if (validatedId === null) {
          const message = 'Token ausente ou inválido';
          res.status(401).json({ error: message });
          return { ok: false, status: 401, message };
        }
        usuarioId = validatedId;

        // Inserir coluna e valor do usuário
        cols.push(userIdCol);
        placeholders.push(`$${values.length + 1}`);
        values.push(usuarioId);
      }

      for (const f of fieldsCreate) {
        const reqKey = typeof f === 'string' ? f : f.req;
        const col = typeof f === 'string' ? f : f.col;
        const val = req.body[reqKey];
        const isEmptyString = typeof val === 'string' && val.toString().trim() === '';

        if (typeof val !== 'undefined' && val !== null && !isEmptyString) {
          const rule = validationRulesCreate[reqKey];
          let toPush = val;
          if (rule && rule.type === 'number') {
            // Coerce numeric strings to Number (validateData already checks type)
            toPush = Number(val);
          }

          cols.push(col);
          placeholders.push(`$${values.length + 1}`);
          values.push(toPush);
        }
      }

      if (cols.length === 0) {
        const message = 'Nenhum dado para inserir';
        res.status(400).json({ error: message });
        return { ok: false, status: 400, message };
      }

      const query = `INSERT INTO ${table} (${cols.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
      return { ok: true, status: 201, data: result.rows[0] };
    } catch (error) {
      const constraintError = constraints(error);
      if (constraintError) {
        const message = constraintError.message;
        res.status(constraintError.status).json({ error: message });
        return { ok: false, status: constraintError.status, message };
      }

      console.error('Erro ao criar ' + itemName + ':', error);
      const message = 'Erro ao criar ' + itemName;
      res.status(500).json({ error: message });
      return { ok: false, status: 500, message };
    }
  }

  async function updateItem(req, res) {
    const { id } = req.params;

    try {
      const { isValid, errors } = validateData(req.body, validationRulesUpdate);
      if (!isValid) {
        const message = `Dados inválidos: ${errors.join(', ')}`;
        res.status(400).json({ error: message });
        return { ok: false, status: 400, message };
      }

      const updates = [];
      const values = [];

      for (const f of fieldsUpdate) {
        const reqKey = typeof f === 'string' ? f : f.req;
        const col = typeof f === 'string' ? f : f.col;
        const val = req.body[reqKey];
        const isEmptyString = typeof val === 'string' && val.toString().trim() === '';
        if (typeof val !== 'undefined' && val !== null && !isEmptyString) {
          // Coerce numbers when validation rule says so
          const rule = validationRulesUpdate[reqKey];
          let toPush = val;
          if (rule && rule.type === 'number') {
            toPush = Number(val);
          }

          updates.push(`${col} = $${values.length + 1}`);
          values.push(toPush);
        }
      }

      if (updates.length === 0) {
        const message = 'Nenhum dado para atualizar';
        res.status(400).json({ error: message });
        return { ok: false, status: 400, message };
      }

      values.push(id);
      const query = `UPDATE ${table} SET ${updates.join(', ')} WHERE ${idCol} = $${values.length} RETURNING *`;
      const result = await pool.query(query, values);

      if (result.rowCount === 0) {
        const message = itemName + ' não encontrado';
        res.status(404).json({ error: message });
        return { ok: false, status: 404, message };
      }

      res.json(result.rows[0]);
      return { ok: true, status: 200, data: result.rows[0] };
    } catch (error) {
      const constraintError = constraints(error);
      if (constraintError) {
        const message = constraintError.message;
        res.status(constraintError.status).json({ error: message });
        return { ok: false, status: constraintError.status, message };
      }

      console.error('Erro ao atualizar ' + itemName + ':', error);
      const message = 'Erro ao atualizar ' + itemName;
      res.status(500).json({ error: message });
      return { ok: false, status: 500, message };
    }
  }

  async function deleteItem(req, res) {
    const { id } = req.params;

    try {
      const result = await pool.query(`DELETE FROM ${table} WHERE ${idCol} = $1 RETURNING *`, [id]);

      if (result.rowCount === 0) {
        const message = itemName + ' não encontrado';
        res.status(404).json({ error: message });
        return { ok: false, status: 404, message };
      }

      const message = itemName + ' deletado com sucesso';
      res.json({ message });
      return { ok: true, status: 200, data: result.rows[0], message };
    } catch (error) {
      const constraintError = constraints(error, 'delete');
      if (constraintError) {
        const message = constraintError.message;
        res.status(constraintError.status).json({ error: message });
        return { ok: false, status: constraintError.status, message };
      }

      console.error('Erro ao deletar ' + itemName + ':', error);
      const message = 'Erro ao deletar ' + itemName;
      res.status(500).json({ error: message });
      return { ok: false, status: 500, message };
    }
  }

  async function deleteAssociative(req, res) {
    try {
      const { isValid, errors } = validateData(req.body, validationRulesDelete);

      if (!isValid) {
        const message = `Dados inválidos: ${errors.join(', ')}`;
        res.status(400).json({ error: message });
        return { ok: false, status: 400, message };
      }

      const conditions = [];
      const values = [];

      for (const f of fieldsDelete || []) {
        const reqKey = typeof f === 'string' ? f : f.req;
        const col = typeof f === 'string' ? f : f.col;
        const val = req.body[reqKey];
        const isEmptyString = typeof val === 'string' && val.toString().trim() === '';

        if (typeof val !== 'undefined' && val !== null && !isEmptyString) {
          const rule = validationRulesDelete ? validationRulesDelete[reqKey] : undefined;
          let toPush = val;
          if (rule && rule.type === 'number') {
            toPush = Number(val);
          }

          values.push(toPush);
          conditions.push(`${col} = $${values.length}`);
        }
      }

      if (conditions.length === 0) {
        const message = 'Nenhum dado para deletar';
        res.status(400).json({ error: message });
        return { ok: false, status: 400, message };
      }

      const query = `DELETE FROM ${table} WHERE ${conditions.join(' AND ')} RETURNING *`;
      const result = await pool.query(query, values);

      if (result.rowCount === 0) {
        const message = itemName + ' não encontrado';
        res.status(404).json({ error: message });
        return { ok: false, status: 404, message };
      }

      const message = itemName + ' deletado com sucesso';
      res.json({ message });
      return { ok: true, status: 200, data: result.rows[0], message };
    } catch (error) {
      const constraintError = constraints(error, 'delete');
      if (constraintError) {
        const message = constraintError.message;
        res.status(constraintError.status).json({ error: message });
        return { ok: false, status: constraintError.status, message };
      }

      console.error('Erro ao deletar ' + itemName + ':', error);
      const message = 'Erro ao deletar ' + itemName;
      res.status(500).json({ error: message });
      return { ok: false, status: 500, message };
    }
  }

  return { getAll, getById, createItem, updateItem, deleteItem, deleteAssociative };
}

module.exports = { basicCrudController };
