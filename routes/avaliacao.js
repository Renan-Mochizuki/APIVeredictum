const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');

router.get('/', avaliacaoController.getAvaliacoes);
router.get('/:id', avaliacaoController.getAvaliacaoById);
router.post('/', avaliacaoController.createAvaliacao);

module.exports = router;
