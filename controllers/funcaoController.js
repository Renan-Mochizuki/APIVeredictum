const pool = require('../config/db');
const { basicCrudController } = require('./factory');

const itemName = 'função';
const itemNamePlural = 'funções';

const fieldsCreate = [{ req: 'tipo', col: 'funcTipo' }];

const validationRulesCreate = {
  tipo: { required: true, type: 'string', minLength: 2, maxLength: 100 },
};

const { getAll, createItem, deleteItem } = basicCrudController({
  table: 'Funcao',
  idCol: 'funcTipo',
  itemName,
  itemNamePlural,
  fieldsCreate,
  fieldsUpdate: null,
  validationRulesCreate,
  validationRulesUpdate: null,
});

module.exports = { getAll, createItem, deleteItem };
