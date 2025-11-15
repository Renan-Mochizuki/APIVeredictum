const express = require('express');
const router = express.Router();
const profissionalController = require('../controllers/profissionalController');

router.get('/', profissionalController.getAll);
router.post('/', profissionalController.createItem);
router.delete('/:id', profissionalController.deleteItem);

module.exports = router;
