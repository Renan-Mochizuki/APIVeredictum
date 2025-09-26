const pool = require('../config/db');
const crypto = require('crypto');

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
  try {
    const { apelido, email, senha } = req.body;
    // Cria um salt aleatório (32 caracteres hexadecimais)
    const salt = crypto.randomBytes(16).toString('hex');
    // Gera o hash da senha usando PBKDF2 com SHA-256
    const hash = crypto.pbkdf2Sync(senha, salt, 1000, 32, 'sha256').toString('hex');

    const result = await pool.query('INSERT INTO Usuario (apelido, email, hash, salt) VALUES ($1, $2, $3, $4) RETURNING *', [apelido, email, hash, salt]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);

    // Verifica se é erro de violação de constraint unique (já existe usuário com email ou apelido iguais)
    if (error.code === '23505') {
      if (error.constraint?.includes('email')) {
        return res.status(409).json({ error: 'Email já está em uso' });
      } else if (error.constraint?.includes('apelido')) {
        return res.status(409).json({ error: 'Esse nome já está em uso' });
      } else {
        return res.status(409).json({ error: 'Email ou nome já em uso' });
      }
    }

    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

module.exports = { getUsuarios, getUsuarioById, createUsuario };
