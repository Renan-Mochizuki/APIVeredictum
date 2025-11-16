const express = require('express');
const router = express.Router();
const criticoController = require('../controllers/criticoController');

router.get('/', criticoController.getAll);
router.get('/:id', criticoController.getById);
router.post('/', criticoController.createCritico);
router.put('/:id', criticoController.updateItem);
router.delete('/:id', criticoController.deleteCritico);

module.exports = router;
