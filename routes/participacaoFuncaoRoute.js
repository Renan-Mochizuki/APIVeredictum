const express = require('express');
const router = express.Router();
const participacaoController = require('../controllers/participacaoController');

router.get('/:id', participacaoController.getByFuncaoId);

module.exports = router;
