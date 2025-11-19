const pool = require('../config/db');
const { basicCrudController } = require('../services/factory');

const itemName = 'obra pais';
const itemNamePlural = 'obras paises';

const fields = [
  { req: 'obraId', col: 'obraId' },
  { req: 'paisId', col: 'paisOrigemId' },
];

const validationRules = {
  obraId: { required: true, type: 'number' },
  paisId: { required: true, type: 'string' },
};

const { getAll, createItem, deleteAssociative } = basicCrudController({
  table: 'Obra_PaisOrigem',
  idCol: null,
  itemName,
  itemNamePlural,
  fieldsCreate: fields,
  fieldsUpdate: null,
  fieldsDelete: fields,
  validationRulesCreate: validationRules,
  validationRulesUpdate: null,
  validationRulesDelete: validationRules,
});

const { getByFks } = require('../services/getByFks');

const { getByFk: getByObraId } = getByFks({
  table: 'Obra_PaisOrigem',
  idCol: null,
  itemName,
  itemNamePlural,
  fkCol: 'obraId',
});

const { getByFk: getByPaisId } = getByFks({
  table: 'Obra_PaisOrigem',
  idCol: null,
  itemName,
  itemNamePlural,
  fkCol: 'paisOrigemId',
});

module.exports = { getAll, createItem, deleteAssociative, getByObraId, getByPaisId };
