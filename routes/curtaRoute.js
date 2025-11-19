const express = require('express');
const router = express.Router();
const obraController = require('../controllers/obraController');

router.get('/', obraController.getCurtas);

module.exports = router;