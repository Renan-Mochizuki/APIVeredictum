const express = require('express');
const router = express.Router();
const funcaoController = require('../controllers/funcaoController');

router.get('/', funcaoController.getFuncoes);
router.post('/', funcaoController.createFuncao);

module.exports = router;