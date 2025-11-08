const pool = require('../config/db');
const { basicCrudController } = require('./factory');

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
  // TODO Validar data
  // dataLancamento: { required: false, type: 'string', format: 'date' },
  titulo: { required: false, type: 'string', maxLength: 100 },
  descricao: { required: false, type: 'string', maxLength: 200 },
  temporadaId: { required: true, type: 'number' },
};

const validationRulesUpdate = {
  numero: { required: false, type: 'number' },
  // TODO Validar data
  // dataLancamento: { required: false, type: 'string', format: 'date' },
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

module.exports = { getAll, getById, createItem, updateItem, deleteItem };
