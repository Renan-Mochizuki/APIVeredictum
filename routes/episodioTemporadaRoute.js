const express = require('express');
const router = express.Router();
const episodioController = require('../controllers/episodioController');

router.get('/:id', episodioController.getByTemporadaId);

module.exports = router;
