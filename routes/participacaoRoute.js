const express = require('express');
const router = express.Router();
const participacaoController = require('../controllers/participacaoController');

router.get('/', participacaoController.getAll);
router.post('/', participacaoController.createItem);
router.put('/:id', participacaoController.updateItem);
router.delete('/:id', participacaoController.deleteItem);

module.exports = router;