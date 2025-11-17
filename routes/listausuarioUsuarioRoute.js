const express = require('express');
const router = express.Router();
const listausuarioController = require('../controllers/listausuarioController');

router.get('/:id', listausuarioController.getByUsuarioId);

module.exports = router;