const express = require('express');
const router = express.Router();
const obraController = require('../controllers/obraController');

router.post('/:nome', obraController.getByNome);

module.exports = router;
