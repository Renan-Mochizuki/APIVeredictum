const express = require('express');
const router = express.Router();
const temporadaController = require('../controllers/temporadaController');

router.get('/:id', temporadaController.getByObraId);

module.exports = router;
