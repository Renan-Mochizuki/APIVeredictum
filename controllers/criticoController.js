const pool = require('../config/db');
const { basicCrudController } = require('./factory');

const itemName = 'crítico';
const itemNamePlural = 'críticos';

const fieldsCreate = [
  { req: 'id', col: 'usuaId' },
  { req: 'nome', col: 'critNome' },
  { req: 'bio', col: 'critBio' },
  { req: 'linkWebsite', col: 'critLinkWebsite' },
  { req: 'linkRedeSocial', col: 'critLinkRedeSocial' },
  { req: 'emailProfissional', col: 'critEmailProfissional' },
];

const fieldsUpdate = [
  { req: 'nome', col: 'critNome' },
  { req: 'bio', col: 'critBio' },
  { req: 'linkWebsite', col: 'critLinkWebsite' },
  { req: 'linkRedeSocial', col: 'critLinkRedeSocial' },
  { req: 'emailProfissional', col: 'critEmailProfissional' },
];

const validationRulesCreate = {
  nome: { required: true, type: 'string', minLength: 10, maxLength: 100 },
  bio: { required: true, type: 'string', maxLength: 300 },
  linkWebsite: { required: false, type: 'string', maxLength: 50 },
  linkRedeSocial: { required: false, type: 'string', maxLength: 50 },
  emailProfissional: { required: false, type: 'string', maxLength: 255 },
};

const validationRulesUpdate = {
  nome: { required: false, type: 'string', minLength: 10, maxLength: 100 },
  bio: { required: false, type: 'string', maxLength: 300 },
  linkWebsite: { required: false, type: 'string', maxLength: 50 },
  linkRedeSocial: { required: false, type: 'string', maxLength: 50 },
  emailProfissional: { required: false, type: 'string', maxLength: 255 },
};

const { getAll, getById, createItem, updateItem, deleteItem } = basicCrudController({
  table: 'Critico',
  idCol: 'usuaId',
  itemName,
  itemNamePlural,
  fieldsCreate,
  fieldsUpdate,
  validationRulesCreate,
  validationRulesUpdate,
});

const createCritico = async (req, res) => {
  const result = await createItem(req, res);

  if (!result.ok) {
    return;
  }

  // Uma entrada na tabela critico foi criada, agora precisamos atualizar a tabela usuario para definir o tipo de usuário como 'critico'
  const usuarioId = result.data.usuaid;

  try {
    await pool.query('UPDATE Usuario SET usuaTipo = $1 WHERE usuaId = $2', ['critico', usuarioId]);
  } catch (error) {
    console.error('Erro ao atualizar o tipo de usuário para crítico:', error);
    const message = 'Erro ao atualizar o tipo de usuário para crítico';
    res.status(500).json({ error: message });
    return;
  }
};

const deleteCritico = async (req, res) => {
  const result = await deleteItem(req, res);

  if (!result.ok) {
    return;
  }

  // A entrada na tabela critico foi deletada, agora precisamos atualizar a tabela usuario para definir o tipo de usuário como 'comum'
  const usuarioId = result.data.usuaid;

  try {
    await pool.query('UPDATE Usuario SET usuaTipo = $1 WHERE usuaId = $2', ['comum', usuarioId]);
  } catch (error) {
    console.error('Erro ao atualizar o tipo de usuário para comum:', error);
    const message = 'Erro ao atualizar o tipo de usuário para comum';
    res.status(500).json({ error: message });
    return;
  }
};

module.exports = { getAll, getById, createCritico, updateItem, deleteCritico };
