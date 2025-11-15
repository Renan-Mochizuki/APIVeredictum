const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');

router.get('/', avaliacaoController.getAll);
router.get('/avaliacoesobras', avaliacaoController.getAvaliacoesObras);
router.get('/:id', avaliacaoController.getById);
router.post('/', avaliacaoController.createItem);
router.put('/:id', avaliacaoController.updateItem);
router.delete('/:id', avaliacaoController.deleteItem);

module.exports = router;
