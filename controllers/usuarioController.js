const pool = require('../config/db');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { validateUserData, validateData } = require('../utils/validation');
const { constraintUser } = require('../utils/constraint');
const { normalizeData } = require('../utils/normalize');
const { basicCrudController } = require('../services/factory');
const config = require('../config/index');
const jwtSecret = config.jwtSecret;
const validateToken = require('../services/validateToken');

const itemName = 'usuário';
const itemNamePlural = 'usuários';

const { getAll, getById, deleteItem } = basicCrudController({
  table: 'Usuario',
  idCol: 'usuaId',
  itemName,
  itemNamePlural,
});

async function createItem(req, res) {
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

    const result = await pool.query('INSERT INTO Usuario (usuaApelido, usuaEmail, usuaHash, usuaSalt) VALUES ($1, $2, $3, $4) RETURNING *', [apelido, email, hash, salt]);
    const usuarioCriado = result.rows[0];

    const payload = { id: usuarioCriado.usuaid };

    // Gera token JWT simples com id do usuário
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '7d' });

    res.status(201).json({ usuario: usuarioCriado, token });
  } catch (error) {
    console.error('Erro ao criar ' + itemName + ':', error);

    // Lidando com constraint violations (e.g., email ou apelido já existentes)
    const constraintError = constraintUser(error);
    if (constraintError) {
      return res.status(constraintError.status).json({ error: constraintError.message });
    }

    res.status(500).json({ error: 'Erro ao criar ' + itemName });
  }
}

async function updateItem(req, res) {
  const { id } = req.params;
  let { apelido, email } = req.body;
  // TODO: Implementar envio do perfilImg

  // Verificação de autenticação: apenas o próprio usuário pode atualizar
  const validatedId = await validateToken(req, res);
  if (validatedId === null) {
    return res.status(401).json({ error: 'Token ausente ou inválido' });
  }

  if (Number(validatedId) !== Number(id)) {
    return res.status(403).json({ error: 'Acesso negado: só pode atualizar o próprio usuário' });
  }

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
    const values = [];
    let idx = 1;

    if (apelido) {
      updates.push(`usuaApelido = $${idx++}`);
      values.push(apelido);
    }
    if (email) {
      updates.push(`usuaEmail = $${idx++}`);
      values.push(email);
    }

    values.push(id);

    const query = `UPDATE Usuario SET ${updates.join(', ')} WHERE usuaId = $${idx} RETURNING *`;
    const result = await pool.query(query, values);

    // Se não for retornado nenhuma linha, o usuário não foi encontrado
    if (result.rowCount === 0) return res.status(404).json({ error: itemName + ' não encontrado' });

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar ' + itemName + ':', error);

    // Lidando com constraint violations (e.g., email ou apelido já existentes)
    const constraintError = constraintUser(error);
    if (constraintError) {
      return res.status(constraintError.status).json({ error: constraintError.message });
    }

    res.status(500).json({ error: 'Erro ao atualizar ' + itemName });
  }
}

async function loginUser(req, res) {
  const { apelido, senha } = req.body || {};

  if (!apelido || !senha) {
    return res.status(400).json({ error: 'Apelido e senha são obrigatórios' });
  }

  try {
    // Normaliza apelido
    const { apelido: apelidoNorm } = normalizeData({ apelido });

    const result = await pool.query('SELECT * FROM Usuario WHERE LOWER(usuaApelido) = LOWER($1)', [apelidoNorm]);
    if (result.rowCount === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const user = result.rows[0];

    const storedHash = user.usuahash;
    const storedSalt = user.usuasalt;

    const candidateHash = crypto.pbkdf2Sync(senha, storedSalt, 1000, 32, 'sha256').toString('hex');

    // Comparação segura
    const hashBuf = Buffer.from(candidateHash, 'hex');
    const storedBuf = Buffer.from(storedHash, 'hex');
    let match = false;
    if (hashBuf.length === storedBuf.length) {
      match = crypto.timingSafeEqual(hashBuf, storedBuf);
    }

    if (!match) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const payload = { id: user.usuaid };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '7d' });

    return res.json({ usuario: user, token });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro ao processar login' });
  }
}

module.exports = { getAll, getById, createItem, updateItem, deleteItem, loginUser };
