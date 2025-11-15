const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getAll);
router.get('/:id', usuarioController.getById);
router.post('/', usuarioController.createItem);
router.put('/:id', usuarioController.updateItem);
router.delete('/:id', usuarioController.deleteItem);

module.exports = router;
