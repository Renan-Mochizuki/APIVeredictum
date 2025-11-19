const pool = require('../config/db');
const { basicCrudController } = require('../services/factory');
const { getByFks } = require('../services/getByFks');
const { getObra } = require('../services/getObra');

const itemName = 'obra';
const itemNamePlural = 'obras';

const fields = [
  { req: 'titulo', col: 'obraTitulo' },
  { req: 'descricao', col: 'obraDescricao' },
  { req: 'tipoObraNome', col: 'obraTipoObraNome' },
  { req: 'dataLancamento', col: 'obraDataLancamento' },
  { req: 'duracao', col: 'obraDuracao' },
  { req: 'imgUrl', col: 'obraImgUrl' },
];

const validationRulesCreate = {
  titulo: { required: true, type: 'string', minLength: 2, maxLength: 150 },
  descricao: { required: false, type: 'string', maxLength: 200 },
  tipoObraNome: { required: true, type: 'string', minLength: 4, maxLength: 12 },
  dataLancamento: { required: false, type: 'date' },
  duracao: { required: false, type: 'number' },
  imgUrl: { required: false, type: 'string', minLength: 30, maxLength: 255 },
};

const validationRulesUpdate = {
  titulo: { required: false, type: 'string', minLength: 2, maxLength: 150 },
  descricao: { required: false, type: 'string', maxLength: 200 },
  tipoObraNome: { required: false, type: 'string', minLength: 4, maxLength: 12 },
  dataLancamento: { required: false, type: 'date' },
  duracao: { required: false, type: 'number' },
  imgUrl: { required: false, type: 'string', minLength: 30, maxLength: 255 },
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

const colunasGetTipo = 'obraid, obratitulo, obracreatedat';

const { getByTipoObra: getFilmes } = getObra({
  colunasGetTipo,
  tipoObra: 'Filme',
  itemNamePlural,
});

const { getByTipoObra: getSeries } = getObra({
  colunasGetTipo,
  tipoObra: 'Série',
  itemNamePlural,
});

const { getByTipoObra: getAnimes } = getObra({
  colunasGetTipo,
  tipoObra: 'Anime',
  itemNamePlural,
});

const { getByTipoObra: getCurtas } = getObra({
  colunasGetTipo,
  tipoObra: 'Curta',
  itemNamePlural,
});

const { getByTipoObra: getDocumentarios } = getObra({
  colunasGetTipo,
  tipoObra: 'Documentário',
  itemNamePlural,
});

module.exports = { getAll, getById, getByTipoObraNome, createItem, updateItem, deleteItem, getFilmes, getSeries, getAnimes, getCurtas, getDocumentarios };
