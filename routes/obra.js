const express = require('express');
const router = express.Router();
const obraController = require('../controllers/obraController');

router.get('/', obraController.getObra);
router.get('/:id', obraController.getObraById);
router.post('/', obraController.createObra);
router.put('/:id', obraController.updateObra);
router.delete('/:id', obraController.deleteObra);

module.exports = router;
