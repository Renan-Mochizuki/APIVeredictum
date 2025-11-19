const pool = require('../config/db');
const { basicCrudController } = require('../services/factory');
const { getByFks } = require('../services/getByFks');

const itemName = 'temporada';
const itemNamePlural = 'temporadas';

const fields = [
  { req: 'numero', col: 'tempNumero' },
  { req: 'titulo', col: 'tempTitulo' },
  { req: 'dataInicio', col: 'tempDataInicio' },
  { req: 'dataFim', col: 'tempDataFim' },
  { req: 'descricao', col: 'tempDescricao' },
  { req: 'obraId', col: 'tempObraId' },
];

const validationRulesCreate = {
  numero: { required: true, type: 'number' },
  titulo: { required: false, type: 'string', maxLength: 100 },
  dataInicio: { required: false, type: 'date' },
  dataFim: { required: false, type: 'date' },
  descricao: { required: false, type: 'string', maxLength: 150 },
  obraId: { required: true, type: 'number' },
};

const validationRulesUpdate = {
  numero: { required: false, type: 'number' },
  titulo: { required: false, type: 'string', maxLength: 100 },
  dataInicio: { required: false, type: 'date' },
  dataFim: { required: false, type: 'date' },
  descricao: { required: false, type: 'string', maxLength: 150 },
  obraId: { required: false, type: 'number' },
};

const { getAll, getById, createItem, updateItem, deleteItem } = basicCrudController({
  table: 'Temporada',
  idCol: 'tempId',
  itemName,
  itemNamePlural,
  fieldsCreate: fields,
  fieldsUpdate: fields,
  validationRulesCreate,
  validationRulesUpdate,
});

const { getByFk: getByObraId } = getByFks({
  table: 'Temporada',
  idCol: 'tempId',
  itemName,
  itemNamePlural,
  fkCol: 'tempObraId',
});

module.exports = { getAll, getById, getByObraId, createItem, updateItem, deleteItem };
