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

const validationRules = {
  obraId: { required: true, type: 'number'},
  funcaoId: { required: true, type: 'string' },
  organizacaoId: { required: false, type: 'string' },
  profissionalId: { required: false, type: 'string' },
};

const { getAll, createItem, updateItem, deleteItem } = basicCrudController({
  table: 'Organizacao',
  idCol: 'orgaId',
  itemName,
  itemNamePlural,
  fieldsCreate: fields,
  fieldsUpdate: fields,
  validationRulesCreate: validationRules,
  validationRulesUpdate: validationRules,
});

// TODO: Implementar updateFuncao e deleteFuncao se necessário

module.exports = { getAll, createItem, updateItem,deleteItem };
