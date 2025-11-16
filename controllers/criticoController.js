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

  // código que só deve ser executado se createItem for bem-sucedido
};

module.exports = { getAll, getById, createCritico, updateItem, deleteItem };
