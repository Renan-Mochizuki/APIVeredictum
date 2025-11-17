const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');

router.get('/:id', avaliacaoController.getByObraId);

module.exports = router;