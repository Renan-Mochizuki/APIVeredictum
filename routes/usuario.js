const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getUsuarios);

router.get('/:id', usuarioController.getUsuarioById);

module.exports = router;
