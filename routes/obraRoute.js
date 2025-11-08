const express = require('express');
const router = express.Router();
const obraController = require('../controllers/obraController');

router.get('/', obraController.getAll);
router.get('/:id', obraController.getById);
router.post('/', obraController.createItem);
router.put('/:id', obraController.updateItem);
router.delete('/:id', obraController.deleteItem);

module.exports = router;
