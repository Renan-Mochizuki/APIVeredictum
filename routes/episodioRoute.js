const express = require('express');
const router = express.Router();
const episodioController = require('../controllers/episodioController');

router.get('/', episodioController.getAll);
router.get('/:id', episodioController.getById);
router.post('/', episodioController.createItem);
router.put('/:id', episodioController.updateItem);
router.delete('/:id', episodioController.deleteItem);

module.exports = router;
