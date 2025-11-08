const pool = require('../config/db');
const { basicCrudController } = require('./factory');

const itemName = 'tipo de obra';
const itemNamePlural = 'tipo de obras';

const { getAll } = basicCrudController({
  table: 'TipoObra',
  idCol: 'tipoObraId',
  itemName,
  itemNamePlural,
});

module.exports = { getAll };
