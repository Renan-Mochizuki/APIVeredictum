const express = require('express');
const router = express.Router();
const criticoController = require('../controllers/criticoController');

router.get('/', criticoController.getAll);
router.post('/', criticoController.createItem);
router.put('/:id', criticoController.updateItem);
router.delete('/:id', criticoController.deleteItem);

module.exports = router;
