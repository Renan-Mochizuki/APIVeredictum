const pool = require('../config/db');
const { basicCrudController } = require('./factory');

const itemName = 'categoria';
const itemNamePlural = 'categorias';

const validationRules = {
  cateNome: { required: true, type: 'string', minLength: 3, maxLength: 100 },
};

const { getAll, createItem } = basicCrudController({
  table: 'Categoria',
  idCol: 'cateId',
  itemName,
  itemNamePlural,
  fieldsCreate: ['cateNome'],
  fieldsUpdate: ['cateNome'],
  validationRulesCreate: validationRules,
  validationRulesUpdate: validationRules,
});

module.exports = { getAll, createItem };
