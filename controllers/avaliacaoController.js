const pool = require('../config/db');
const { basicCrudController } = require('../services/factory');
const { getByFks } = require('../services/getByFks');

const itemName = 'avaliação';
const itemNamePlural = 'avaliações';

const fields = [
  { req: 'usuarioId', col: 'avalUsuarioId' },
  { req: 'obraId', col: 'avalObraId' },
  { req: 'episodioId', col: 'avalEpisodioId' },
  { req: 'nota', col: 'avalNota' },
  { req: 'comentario', col: 'avalComentario' },
];

const validationRulesCreate = {
  usuarioId: { required: true, type: 'number' },
  obraId: { required: false, type: 'number' },
  episodioId: { required: false, type: 'number' },
  nota: { required: true, type: 'number', minValue: 0, maxValue: 10 },
  comentario: { required: false, type: 'string', maxLength: 500 },
};

const validationRulesUpdate = {
  usuarioId: { required: false, type: 'number' },
  obraId: { required: false, type: 'number' },
  episodioId: { required: false, type: 'number' },
  nota: { required: false, type: 'number', minValue: 0, maxValue: 10 },
  comentario: { required: false, type: 'string', maxLength: 500 },
};

const { getAll, getById, createItem, updateItem, deleteItem } = basicCrudController({
  table: 'Avaliacao',
  idCol: 'avalId',
  itemName,
  itemNamePlural,
  fieldsCreate: fields,
  fieldsUpdate: fields,
  validationRulesCreate,
  validationRulesUpdate,
});

async function getAvaliacoesObras(req, res) {
  try {
    const result = await pool.query(`
      SELECT 
        u.usuaApelido,
        o.obraTitulo,
        a.avalNota,
        a.avalComentario
      FROM Avaliacao a
      JOIN Usuario u ON a.avalUsuarioId = u.usuaId
      JOIN Obra o ON a.avalObraId = o.obraId;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar ' + itemNamePlural + ' de obras:', error);
    res.status(500).json({ error: 'Erro ao buscar ' + itemNamePlural + ' de obras' });
  }
}

const { getByFk: getByUsuarioId } = getByFks({
  table: 'Avaliacao',
  idCol: 'avalId',
  itemName,
  itemNamePlural,
  fkCol: 'avalUsuarioId',
});

const { getByFk: getByObraId } = getByFks({
  table: 'Avaliacao',
  idCol: 'avalId',
  itemName,
  itemNamePlural,
  fkCol: 'avalObraId',
});

const { getByFk: getByEpisodioId } = getByFks({
  table: 'Avaliacao',
  idCol: 'avalId',
  itemName,
  itemNamePlural,
  fkCol: 'avalEpisodioId',
});

async function getObraByUsuarioId(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT a.avalid, a.avalnota, a.avalcomentario, a.avalcreatedat, a.avalupdatedat, o.obratitulo AS avalobratitulo FROM Avaliacao a JOIN Obra o ON o.obraid = a.avalobraid WHERE a.avalusuarioid = $1 AND a.avalobraid IS NOT NULL;`, [id]);
    if (result.rows.length === 0) {
      const message = `${itemName} não encontrado`;
      return res.status(404).json({ error: message });
    }
    res.json(result.rows);
  } catch (err) {
    console.error(`Erro ao buscar ${itemName}:`, err);
    const message = `Erro ao buscar ${itemName}`;
    res.status(500).json({ error: message });
  }
}

async function getEpisodioByUsuarioId(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT a.avalid, a.avalnota, a.avalcomentario, a.avalcreatedat, a.avalupdatedat, e.epistitulo AS avalepisodiotitulo FROM Avaliacao a JOIN Episodio e ON e.episid = a.avalepisodioid WHERE a.avalusuarioid = $1 AND a.avalepisodioid IS NOT NULL;`, [id]);
    if (result.rows.length === 0) {
      const message = `${itemName} não encontrado`;
      return res.status(404).json({ error: message });
    }
    res.json(result.rows);
  } catch (err) {
    console.error(`Erro ao buscar ${itemName}:`, err);
    const message = `Erro ao buscar ${itemName}`;
    res.status(500).json({ error: message });
  }
}

module.exports = { getAll, getById, createItem, updateItem, deleteItem, getAvaliacoesObras, getByUsuarioId, getByObraId, getByEpisodioId, getObraByUsuarioId, getEpisodioByUsuarioId };
