const express = require('express');
const router = express.Router();
const tipoobraController = require('../controllers/tipoobraController');

router.get('/', tipoobraController.getTipoObras);

module.exports = router;
