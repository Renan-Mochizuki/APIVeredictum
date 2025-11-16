const pool = require('../config/db');
const { basicCrudController } = require('./factory');

const itemName = 'participacao';
const itemNamePlural = 'participacoes';

const fields = [
  { req: 'obraId', col: 'partObraId' },
  { req: 'funcaoId', col: 'partFuncaoId' },
  { req: 'organizacaoId', col: 'partOrganizacaoId' },
  { req: 'profissionalId', col: 'partProfissionalId' },
];

const validationRulesCreate = {
  obraId: { required: true, type: 'number' },
  funcaoId: { required: true, type: 'string' },
  organizacaoId: { required: false, type: 'string' },
  profissionalId: { required: false, type: 'string' },
};

const validationRulesUpdate = {
  obraId: { required: false, type: 'number' },
  funcaoId: { required: false, type: 'string' },
  organizacaoId: { required: false, type: 'string' },
  profissionalId: { required: false, type: 'string' },
};

const { getAll, getById, createItem, updateItem, deleteItem } = basicCrudController({
  table: 'Participacao',
  idCol: 'partId',
  itemName,
  itemNamePlural,
  fieldsCreate: fields,
  fieldsUpdate: fields,
  validationRulesCreate,
  validationRulesUpdate,
});

module.exports = { getAll, getById, createItem, updateItem, deleteItem };
