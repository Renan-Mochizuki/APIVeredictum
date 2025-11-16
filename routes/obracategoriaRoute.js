const express = require('express');
const router = express.Router();
const obracategoriaController = require('../controllers/obracategoriaController');

router.get('/', obracategoriaController.getAll);
router.post('/', obracategoriaController.createItem);
router.delete('/', obracategoriaController.deleteAssociative);

module.exports = router;