const pool = require('../config/db');
const { basicCrudController } = require('./factory');

const itemName = 'organização';
const itemNamePlural = 'organizações';

const fields = [{ req: 'nome', col: 'orgaNome' }];

const validationRules = {
  nome: { required: true, type: 'string', minLength: 5, maxLength: 100 },
};

const { getAll, createItem, deleteItem } = basicCrudController({
  table: 'Organizacao',
  idCol: 'orgaNome',
  itemName,
  itemNamePlural,
  fieldsCreate: fields,
  fieldsUpdate: fields,
  validationRulesCreate: validationRules,
  validationRulesUpdate: validationRules,
});

// TODO: Implementar updateFuncao e deleteFuncao se necessário

module.exports = { getAll, createItem, deleteItem };
