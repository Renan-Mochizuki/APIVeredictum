const pool = require('../config/db');
const { basicCrudController } = require('../services/factory');
const { getByFks } = require('../services/getByFks');

const itemName = 'lista de usuário';
const itemNamePlural = 'listas de usuários';

const fields = [
  { req: 'titulo', col: 'listTitulo' },
  { req: 'descricao', col: 'listDescricao' },
  { req: 'privado', col: 'listPrivado' },
  { req: 'usuarioId', col: 'listUsuarioId' },
];

const validationRulesCreate = {
  titulo: { required: true, type: 'string', minLength: 5, maxLength: 100 },
  descricao: { required: false, type: 'string', maxLength: 200 },
  privado: { required: true, type: 'boolean' },
  usuarioId: { required: true, type: 'number' },
};

const validationRulesUpdate = {
  titulo: { required: false, type: 'string', minLength: 5, maxLength: 100 },
  descricao: { required: false, type: 'string', maxLength: 200 },
  privado: { required: false, type: 'boolean' },
  usuarioId: { required: false, type: 'number' },
};

const { getAll, getById, createItem, updateItem, deleteItem } = basicCrudController({
  table: 'ListaUsuario',
  idCol: 'listId',
  itemName,
  itemNamePlural,
  fieldsCreate: fields,
  fieldsUpdate: fields,
  validationRulesCreate,
  validationRulesUpdate,
});

const { getByFk: getByUsuarioId } = getByFks({
  table: 'ListaUsuario',
  idCol: 'listId',
  itemName,
  itemNamePlural,
  fkCol: 'listUsuarioId',
});

module.exports = { getAll, getById, getByUsuarioId, createItem, updateItem, deleteItem };
