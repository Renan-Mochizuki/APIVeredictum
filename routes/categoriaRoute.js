const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/', categoriaController.getAll);
router.post('/', categoriaController.createItem);

module.exports = router;
