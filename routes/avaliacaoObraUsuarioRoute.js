const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');

router.get('/:id', avaliacaoController.getObraByUsuarioId);

module.exports = router;