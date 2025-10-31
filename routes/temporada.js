const express = require('express');
const router = express.Router();
const temporadaController = require('../controllers/temporadaController');

router.get('/', temporadaController.getTemporadas);
router.get('/:id', temporadaController.getTemporadaById);
router.post('/', temporadaController.createTemporada);
router.put('/:id', temporadaController.updateTemporada);
router.delete('/:id', temporadaController.deleteTemporada);

module.exports = router;
