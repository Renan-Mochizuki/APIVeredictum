const pool = require('../config/db');
const crypto = require('crypto');
const { validateUserData, validateData } = require('../utils/validation');
const { constraintUser } = require('../utils/constraint');
const { normalizeData } = require('../utils/normalize');

async function getUsuarios(req, res) {
  try {
    const result = await pool.query('SELECT * FROM Usuario');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
}

async function getUsuarioById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Usuario WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
}

async function createUsuario(req, res) {
  let { apelido, email, senha } = req.body;

  try {
    // Valida dados do usuário
    const { isValid, errors } = validateUserData(req.body);

    if (!isValid) {
      return res.status(400).json({ error: `Dados inválidos: ${errors.join(', ')}` });
    }

    // Normaliza campos
    ({ apelido, email } = normalizeData(req.body));

    // Cria um salt aleatório (32 caracteres hexadecimais)
    const salt = crypto.randomBytes(16).toString('hex');
    // Gera o hash da senha usando PBKDF2 com SHA-256
    const hash = crypto.pbkdf2Sync(senha, salt, 1000, 32, 'sha256').toString('hex');

    const result = await pool.query('INSERT INTO Usuario (apelido, email, hash, salt) VALUES ($1, $2, $3, $4) RETURNING *', [apelido, email, hash, salt]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);

    // Lidando com constraint violations (e.g., email ou apelido já existentes)
    const constraintError = constraintUser(error);
    if (constraintError) {
      return res.status(constraintError.status).json({ error: constraintError.message });
    }

    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

async function updateUsuario(req, res) {
  const { id } = req.params;
  let { apelido, email } = req.body;
  // TODO: Implementar envio do perfilImg

  if (!apelido && !email) {
    return res.status(400).json({ error: 'Nenhum dado foi fornecido' });
  }

  // Regras de validação, como estamos atualizando dados, apelido e email não são required
  const validationRules = {
    apelido: { required: false, minLength: 3, maxLength: 30 },
    email: { required: false, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, patternMessage: 'Email possui formato inválido' },
  };

  try {
    // Valida dados do usuário
    const { isValid, errors } = validateData(req.body, validationRules);

    if (!isValid) {
      return res.status(400).json({ error: `Dados do usuário inválidos: ${errors.join(', ')}` });
    }

    // Normaliza campos
    ({ apelido, email } = normalizeData(req.body));

    // Escrevendo valores do update
    const updates = [];
    if (apelido) {
      updates.push(`apelido = '${apelido}'`);
    }
    if (email) {
      updates.push(`email = '${email}'`);
    }

    const result = await pool.query(`UPDATE Usuario SET ${updates.join(', ')} WHERE id = ${id} RETURNING *`);

    // Se não for retornado nenhuma linha, o usuário não foi encontrado
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);

    // Lidando com constraint violations (e.g., email ou apelido já existentes)
    const constraintError = constraintUser(error);
    if (constraintError) {
      return res.status(constraintError.status).json({ error: constraintError.message });
    }

    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
}

async function deleteUsuario(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM Usuario WHERE id = $1 RETURNING *', [id]);
    
    // Se não for retornado nenhuma linha, o usuário não foi encontrado
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
}

module.exports = { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario };
