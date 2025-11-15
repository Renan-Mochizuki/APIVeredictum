const pool = require('../config/db');
const { basicCrudController } = require('./factory');

const itemName = 'profissional';
const itemNamePlural = 'profissionais';

const fields = [{ req: 'nome', col: 'profNome' }];

const validationRules = {
  nome: { required: true, type: 'string', minLength: 2, maxLength: 100 },
};

const { getAll, createItem, deleteItem } = basicCrudController({
  table: 'Profissional',
  idCol: 'profNome',
  itemName,
  itemNamePlural,
  fieldsCreate: fields,
  fieldsUpdate: fields,
  validationRulesCreate: validationRules,
  validationRulesUpdate: validationRules,
});

// TODO: Implementar updateFuncao e deleteFuncao se necessário

module.exports = { getAll, createItem, deleteItem };
