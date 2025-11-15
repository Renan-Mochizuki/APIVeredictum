const express = require('express');
const router = express.Router();
const tipoobraController = require('../controllers/tipoobraController');

router.get('/', tipoobraController.getAll);

module.exports = router;
