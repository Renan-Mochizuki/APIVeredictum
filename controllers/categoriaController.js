const pool = require('../config/db');
const { basicCrudController } = require('./factory');

const itemName = 'categoria';
const itemNamePlural = 'categorias';

const fields = [{ req: 'nome', col: 'cateNome' }];

const validationRules = {
  nome: { required: true, type: 'string', minLength: 3, maxLength: 30 },
};

const { getAll, createItem } = basicCrudController({
  table: 'Categoria',
  idCol: 'cateId',
  itemName,
  itemNamePlural,
  fieldsCreate: fields,
  fieldsUpdate: fields,
  validationRulesCreate: validationRules,
  validationRulesUpdate: validationRules,
});

module.exports = { getAll, createItem };
