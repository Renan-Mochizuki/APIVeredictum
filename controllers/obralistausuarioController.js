const pool = require('../config/db');
const { basicCrudController } = require('./factory');

const itemName = 'obra lista usuario';
const itemNamePlural = 'obras listas usuario';

const fields = [
  { req: 'obraId', col: 'obraId' },
  { req: 'listaUsuarioId', col: 'listaUsuarioId' }
];

const validationRules = {
  obraId: { required: true, type: 'number' },
  listaUsuarioId: { required: true, type: 'number' },
};

const { getAll, createItem, deleteAssociative } = basicCrudController({
  table: 'Obra_ListaUsuario',
  idCol: null,
  itemName,
  itemNamePlural,
  fieldsCreate: fields,
  fieldsUpdate: null,
  fieldsDelete: fields,
  validationRulesCreate: validationRules,
  validationRulesUpdate: null,
  validationRulesDelete: validationRules,
});

module.exports = { getAll, createItem, deleteAssociative };