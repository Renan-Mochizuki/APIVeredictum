const express = require('express');
const router = express.Router();
const temporadaController = require('../controllers/temporadaController');

router.get('/', temporadaController.getTemporadas);
router.get('/:id', temporadaController.getTemporadaById);
router.post('/', temporadaController.createTemporada);

module.exports = router;
