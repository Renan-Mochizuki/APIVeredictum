const express = require('express');
const router = express.Router();
const listausuarioController = require('../controllers/listausuarioController');

router.get('/', listausuarioController.getAll);
router.post('/', listausuarioController.createItem);
router.put('/:id', listausuarioController.updateItem);
router.delete('/:id', listausuarioController.deleteItem);

module.exports = router;
