const express = require('express');
const router = express.Router();
const organizacaoController = require('../controllers/organizacaoController');

router.get('/', organizacaoController.getAll);
router.post('/', organizacaoController.createItem);
router.delete('/:id', organizacaoController.deleteItem);

module.exports = router;