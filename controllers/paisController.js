const pool = require('../config/db');
const { basicCrudController } = require('../services/factory');

const itemName = 'pais';
const itemNamePlural = 'paises';

const { getAll } = basicCrudController({
  table: 'PaisOrigem',
  idCol: 'paisId',
  itemName,
  itemNamePlural,
});

module.exports = { getAll };
