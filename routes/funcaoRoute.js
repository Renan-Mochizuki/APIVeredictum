const express = require('express');
const router = express.Router();
const funcaoController = require('../controllers/funcaoController');

router.get('/', funcaoController.getAll);
router.post('/', funcaoController.createItem);

module.exports = router;
