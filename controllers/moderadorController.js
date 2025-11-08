const pool = require('../config/db');
const { basicCrudController } = require('./factory');

const itemName = 'crítico';
const itemNamePlural = 'críticos';

const fieldsCreate = [
  { req: 'id', col: 'usuaId' },
  { req: 'permissaoCatalogo', col: 'modePermissaoCatalogo' },
  { req: 'permissaoComunidade', col: 'modePermissaoComunidade' },
  { req: 'permissaoVerificacao', col: 'modePermissaoVerificacao' },
];

const fieldsUpdate = [
  { req: 'permissaoCatalogo', col: 'modePermissaoCatalogo' },
  { req: 'permissaoComunidade', col: 'modePermissaoComunidade' },
  { req: 'permissaoVerificacao', col: 'modePermissaoVerificacao' },
];

const validationRulesCreate = {
  id: { required: true, type: 'number' },
  permissaoCatalogo: { required: false, type: 'boolean' },
  permissaoComunidade: { required: false, type: 'boolean' },
  permissaoVerificacao: { required: false, type: 'boolean' },
};

const validationRulesUpdate = {
  permissaoCatalogo: { required: false, type: 'boolean' },
  permissaoComunidade: { required: false, type: 'boolean' },
  permissaoVerificacao: { required: false, type: 'boolean' },
};

const { getAll, createItem, updateItem, deleteItem } = basicCrudController({
  table: 'Moderador',
  idCol: 'usuaId',
  itemName,
  itemNamePlural,
  fieldsCreate,
  fieldsUpdate,
  validationRulesCreate,
  validationRulesUpdate,
});

module.exports = { getAll, createItem, updateItem, deleteItem };
