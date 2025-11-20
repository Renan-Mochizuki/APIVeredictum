const pool = require('../config/db');
const { get } = require('../routes/episodioRoute');
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

const { getById, createItem, updateItem, deleteItem } = basicCrudController({
  table: 'Obra',
  idCol: 'obraId',
  itemName,
  itemNamePlural,
  fieldsCreate: fields,
  fieldsUpdate: fields,
  validationRulesCreate,
  validationRulesUpdate,
});

async function getAll(req, res) {
  try {
    const result = await pool.query(
      `SELECT o.*, (SELECT ROUND(AVG(a.avalNota), 1) FROM Avaliacao a WHERE a.avalObraId = o.obraId) AS obranota FROM Obra o ORDER BY o.obraDataLancamento DESC`
    );
    res.json(result.rows);
    return { ok: true, status: 200, data: result.rows };
  } catch (err) {
    console.error(`Erro ao buscar ${itemNamePlural}:`, err);
    const message = `Erro ao buscar ${itemNamePlural}`;
    res.status(500).json({ error: message });
    return { ok: false, status: 500, message };
  }
}

async function getByNome(req, res){
  const { nome } = req.params;
  try {
    const result = await pool.query(
      `SELECT o.*, (SELECT ROUND(AVG(a.avalNota), 1) FROM Avaliacao a WHERE a.avalObraId = o.obraId) AS obranota FROM Obra o WHERE o.obraTitulo ILIKE $1 ORDER BY o.obraDataLancamento DESC`,
      [`%${nome}%`]
    );
    res.json(result.rows);
    return { ok: true, status: 200, data: result.rows };
  } catch (err) {
    console.error(`Erro ao buscar ${itemNamePlural} por nome:`, err);
    const message = `Erro ao buscar ${itemNamePlural} por nome`;
    res.status(500).json({ error: message });
    return { ok: false, status: 500, message };
  }
}

const { getByFk: getByTipoObraNome } = getByFks({
  table: 'Obra',
  idCol: 'obraId',
  itemName,
  itemNamePlural,
  fkCol: 'obraTipoObraNome',
});

const colunasGetTipo = 'obraid, obratitulo, obraduracao, obradatalancamento, obraimgurl';

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

module.exports = { getAll, getById, getByTipoObraNome, createItem, updateItem, deleteItem, getFilmes, getSeries, getAnimes, getCurtas, getDocumentarios, getByNome };
