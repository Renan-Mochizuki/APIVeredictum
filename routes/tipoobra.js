const express = require('express');
const router = express.Router();
const tipoobraController = require('../controllers/tipoobraController');

router.get('/', tipoobraController.getTipoObras);
router.get('/:id', tipoobraController.getTipoObraById);

module.exports = router;
