const pool = require('../config/db');
const { basicCrudController } = require('./factory');
const { getByFks } = require('./getByFks');

const itemName = 'obra';
const itemNamePlural = 'obras';

const fields = [
  { req: 'titulo', col: 'obraTitulo' },
  { req: 'descricao', col: 'obraDescricao' },
  { req: 'tipoObraNome', col: 'obraTipoObraNome' },
];

const validationRulesCreate = {
  titulo: { required: true, type: 'string', minLength: 2, maxLength: 150 },
  descricao: { required: false, type: 'string', maxLength: 200 },
  tipoObraNome: { required: true, type: 'string', minLength: 4, maxLength: 12 },
};

const validationRulesUpdate = {
  titulo: { required: false, type: 'string', minLength: 2, maxLength: 150 },
  descricao: { required: false, type: 'string', maxLength: 200 },
  tipoObraNome: { required: false, type: 'string', minLength: 4, maxLength: 12 },
};

const { getAll, getById, createItem, updateItem, deleteItem } = basicCrudController({
  table: 'Obra',
  idCol: 'obraId',
  itemName,
  itemNamePlural,
  fieldsCreate: fields,
  fieldsUpdate: fields,
  validationRulesCreate,
  validationRulesUpdate,
});

const { getByFk: getByTipoObraNome } = getByFks({
  table: 'Obra',
  idCol: 'obraId',
  itemName,
  itemNamePlural,
  fkCol: 'obraTipoObraNome',
});

module.exports = { getAll, getById, getByTipoObraNome, createItem, updateItem, deleteItem };
