const express = require('express');
const router = express.Router();
const temporadaController = require('../controllers/temporadaController');

router.get('/', temporadaController.getAll);
router.get('/:id', temporadaController.getById);
router.post('/', temporadaController.createItem);
router.put('/:id', temporadaController.updateItem);
router.delete('/:id', temporadaController.deleteItem);

module.exports = router;
