const pool = require('../config/db');
const { basicCrudController } = require('./factory');

const itemName = 'categoria';
const itemNamePlural = 'categorias';

const fieldsCreate = [{ req: 'nome', col: 'cateNome' }];

const validationRulesCreate = {
  nome: { required: true, type: 'string', minLength: 3, maxLength: 30 },
};

const { getAll, createItem, deleteItem } = basicCrudController({
  table: 'Categoria',
  idCol: 'cateNome',
  itemName,
  itemNamePlural,
  fieldsCreate,
  fieldsUpdate: null,
  validationRulesCreate,
  validationRulesUpdate: null,
});

module.exports = { getAll, createItem, deleteItem };
