const pool = require('../config/db');
const { basicCrudController } = require('../services/factory');

const itemName = 'profissional';
const itemNamePlural = 'profissionais';

const fieldsCreate = [{ req: 'nome', col: 'profNome' }];

const validationRulesCreate = {
  nome: { required: true, type: 'string', minLength: 2, maxLength: 100 },
};

const { getAll, createItem, deleteItem } = basicCrudController({
  table: 'Profissional',
  idCol: 'profNome',
  itemName,
  itemNamePlural,
  fieldsCreate,
  fieldsUpdate: null,
  validationRulesCreate,
  validationRulesUpdate: null,
});

module.exports = { getAll, createItem, deleteItem };
