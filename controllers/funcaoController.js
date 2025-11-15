const pool = require('../config/db');
const { basicCrudController } = require('./factory');

const itemName = 'função';
const itemNamePlural = 'funções';

const fields = [{ req: 'tipo', col: 'funcTipo' }];

const validationRules = {
  tipo: { required: true, type: 'string', minLength: 2, maxLength: 100 },
};

const { getAll, createItem, deleteItem } = basicCrudController({
  table: 'Funcao',
  idCol: 'funcTipo',
  itemName,
  itemNamePlural,
  fieldsCreate: fields,
  fieldsUpdate: fields,
  validationRulesCreate: validationRules,
  validationRulesUpdate: validationRules,
});

// TODO: Implementar updateFuncao e deleteFuncao se necessário

module.exports = { getAll, createItem, deleteItem };
