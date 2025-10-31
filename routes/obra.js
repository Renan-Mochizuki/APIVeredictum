const express = require('express');
const router = express.Router();
const obraController = require('../controllers/obraController');

router.get('/', obraController.getObra);
router.get('/:id', obraController.getObraById);
router.post('/', obraController.createObra);

module.exports = router;
