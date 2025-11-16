const pool = require('../config/db');
const { basicCrudController } = require('./factory');

const itemName = 'moderador';
const itemNamePlural = 'moderadores';

const fieldsCreate = [
  { req: 'id', col: 'usuaId' },
  { req: 'permissaoCatalogo', col: 'modePermissaoCatalogo' },
  { req: 'permissaoComunidade', col: 'modePermissaoComunidade' },
  { req: 'permissaoVerificacao', col: 'modePermissaoVerificacao' },
];

const fieldsUpdate = [
  { req: 'permissaoCatalogo', col: 'modePermissaoCatalogo' },
  { req: 'permissaoComunidade', col: 'modePermissaoComunidade' },
  { req: 'permissaoVerificacao', col: 'modePermissaoVerificacao' },
];

const validationRulesCreate = {
  id: { required: true, type: 'number' },
  permissaoCatalogo: { required: false, type: 'boolean' },
  permissaoComunidade: { required: false, type: 'boolean' },
  permissaoVerificacao: { required: false, type: 'boolean' },
};

const validationRulesUpdate = {
  permissaoCatalogo: { required: false, type: 'boolean' },
  permissaoComunidade: { required: false, type: 'boolean' },
  permissaoVerificacao: { required: false, type: 'boolean' },
};

const { getAll, getById, createItem, updateItem, deleteItem } = basicCrudController({
  table: 'Moderador',
  idCol: 'usuaId',
  itemName,
  itemNamePlural,
  fieldsCreate,
  fieldsUpdate,
  validationRulesCreate,
  validationRulesUpdate,
});

const createModerador = async (req, res) => {
  const result = await createItem(req, res);

  if (!result.ok) {
    return;
  }

  // Uma entrada na tabela moderador foi criada, agora precisamos atualizar a tabela usuario para definir o tipo de usuário como 'moderador'
  const usuarioId = result.data.usuaid;

  try {
    await pool.query('UPDATE Usuario SET usuaTipo = $1 WHERE usuaId = $2', ['moderador', usuarioId]);
  } catch (error) {
    console.error('Erro ao atualizar o tipo de usuário para moderador:', error);
    const message = 'Erro ao atualizar o tipo de usuário para moderador';
    res.status(500).json({ error: message });
    return;
  }
};

const deleteModerador = async (req, res) => {
  const result = await deleteItem(req, res);

  if (!result.ok) {
    return;
  }

  // A entrada na tabela moderador foi deletada, agora precisamos atualizar a tabela usuario para definir o tipo de usuário como 'comum'
  const usuarioId = result.data.usuaid;

  try {
    await pool.query('UPDATE Usuario SET usuaTipo = $1 WHERE usuaId = $2', ['comum', usuarioId]);
  } catch (error) {
    console.error('Erro ao atualizar o tipo de usuário para comum:', error);
    const message = 'Erro ao atualizar o tipo de usuário para comum';
    res.status(500).json({ error: message });
    return;
  }
};

module.exports = { getAll, getById, createModerador, updateItem, deleteModerador };