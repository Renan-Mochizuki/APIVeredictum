const express = require('express');
const router = express.Router();
const obracategoriaController = require('../controllers/obracategoriaController');

router.get('/:id', obracategoriaController.getByCategoriaId);

module.exports = router;
