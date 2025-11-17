const pool = require('../config/db');
const { basicCrudController } = require('./factory');
const { getByFks } = require('./getByFks');

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

module.exports = { getAll, getById, createItem, updateItem, deleteItem, getAvaliacoesObras, getByUsuarioId, getByObraId, getByEpisodioId };