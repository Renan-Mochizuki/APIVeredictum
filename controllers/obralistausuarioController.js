const pool = require('../config/db');
const { basicCrudController } = require('../services/factory');

const itemName = 'obra lista usuario';
const itemNamePlural = 'obras listas usuario';

const fields = [
  { req: 'obraId', col: 'obraId' },
  { req: 'listaUsuarioId', col: 'listaUsuarioId' },
];

const validationRules = {
  obraId: { required: true, type: 'number' },
  listaUsuarioId: { required: true, type: 'number' },
};

const { getAll, createItem, deleteAssociative } = basicCrudController({
  table: 'Obra_ListaUsuario',
  idCol: null,
  itemName,
  itemNamePlural,
  fieldsCreate: fields,
  fieldsUpdate: null,
  fieldsDelete: fields,
  validationRulesCreate: validationRules,
  validationRulesUpdate: null,
  validationRulesDelete: validationRules,
});

const { getByFks } = require('../services/getByFks');

const { getByFk: getByObraId } = getByFks({
  table: 'Obra_ListaUsuario',
  idCol: null,
  itemName,
  itemNamePlural,
  fkCol: 'obraId',
});

const { getByFk: getByListaUsuarioId } = getByFks({
  table: 'Obra_ListaUsuario',
  idCol: null,
  itemName,
  itemNamePlural,
  fkCol: 'listaUsuarioId',
});

module.exports = { getAll, createItem, deleteAssociative, getByObraId, getByListaUsuarioId };
