const pool = require('../config/db');
const { basicCrudController } = require('./factory');

const itemName = 'obra categoria';
const itemNamePlural = 'obras categorias';

const fields = [
  { req: 'obraId', col: 'obraId' },
  { req: 'categoriaId', col: 'categoriaId' },
];

const validationRules = {
  obraId: { required: true, type: 'number' },
  categoriaId: { required: true, type: 'string' },
};

const { getAll, createItem, deleteAssociative } = basicCrudController({
  table: 'Obra_Categoria',
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

const { getByFks } = require('./getByFks');

const { getByFk: getByObraId } = getByFks({
  table: 'Obra_Categoria',
  idCol: null,
  itemName,
  itemNamePlural,
  fkCol: 'obraId',
});

const { getByFk: getByCategoriaId } = getByFks({
  table: 'Obra_Categoria',
  idCol: null,
  itemName,
  itemNamePlural,
  fkCol: 'categoriaId',
});

module.exports = { getAll, createItem, deleteAssociative, getByObraId, getByCategoriaId };
