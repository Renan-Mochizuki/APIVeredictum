const express = require('express');
const router = express.Router();
const moderadorController = require('../controllers/moderadorController');

router.get('/', moderadorController.getAll);
router.post('/', moderadorController.createItem);
router.put('/:id', moderadorController.updateItem);
router.delete('/:id', moderadorController.deleteItem);

module.exports = router;
