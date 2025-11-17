const express = require('express');
const router = express.Router();
const participacaoController = require('../controllers/participacaoController');

router.get('/:id', participacaoController.getByObraId);

module.exports = router;