const pool = require('../config/db');
const { basicCrudController } = require('./factory');

const itemName = 'obra pais';
const itemNamePlural = 'obras paises';

const fields = [
  { req: 'obraId', col: 'obraId' },
  { req: 'paisId', col: 'paisOrigemId' }
];

const validationRules = {
  obraId: { required: true, type: 'number' },
  paisId: { required: true, type: 'string' },
};

const { getAll, createItem, deleteAssociative } = basicCrudController({
  table: 'Obra_PaisOrigem',
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