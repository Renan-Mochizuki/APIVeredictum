const pool = require('../config/db');
const { basicCrudController } = require('../services/factory');

const itemName = 'organização';
const itemNamePlural = 'organizações';

const fieldsCreate = [{ req: 'nome', col: 'orgaNome' }];

const validationRulesCreate = {
  nome: { required: true, type: 'string', minLength: 5, maxLength: 100 },
};

const { getAll, createItem, deleteItem } = basicCrudController({
  table: 'Organizacao',
  idCol: 'orgaNome',
  itemName,
  itemNamePlural,
  fieldsCreate,
  fieldsUpdate: null,
  validationRulesCreate,
  validationRulesUpdate: null,
});

// TODO: Implementar updateFuncao e deleteFuncao se necessário

module.exports = { getAll, createItem, deleteItem };
