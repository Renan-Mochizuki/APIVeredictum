const pool = require('../config/db');
const { basicCrudController } = require('../services/factory');
const { getByFks } = require('../services/getByFks');

const itemName = 'episódio';
const itemNamePlural = 'episódios';

const fields = [
  { req: 'numero', col: 'episNumero' },
  { req: 'dataLancamento', col: 'episDataLancamento' },
  { req: 'titulo', col: 'episTitulo' },
  { req: 'descricao', col: 'episDescricao' },
  { req: 'temporadaId', col: 'episTemporadaId' },
];

const validationRulesCreate = {
  numero: { required: true, type: 'number' },
  dataLancamento: { required: false, type: 'date' },
  titulo: { required: false, type: 'string', maxLength: 100 },
  descricao: { required: false, type: 'string', maxLength: 200 },
  temporadaId: { required: true, type: 'number' },
};

const validationRulesUpdate = {
  numero: { required: false, type: 'number' },
  dataLancamento: { required: false, type: 'date' },
  titulo: { required: false, type: 'string', maxLength: 100 },
  descricao: { required: false, type: 'string', maxLength: 200 },
  temporadaId: { required: false, type: 'number' },
};

const { getAll, getById, createItem, updateItem, deleteItem } = basicCrudController({
  table: 'Episodio',
  idCol: 'episId',
  itemName,
  itemNamePlural,
  fieldsCreate: fields,
  fieldsUpdate: fields,
  validationRulesCreate,
  validationRulesUpdate,
});

const { getByFk: getByTemporadaId } = getByFks({
  table: 'Episodio',
  idCol: 'episId',
  itemName,
  itemNamePlural,
  fkCol: 'episTemporadaId',
});

module.exports = { getAll, getById, getByTemporadaId, createItem, updateItem, deleteItem };
