const express = require('express');
const router = express.Router();
const obralistaController = require('../controllers/obralistausuarioController');

router.get('/:id', obralistaController.getByObraId);

module.exports = router;
