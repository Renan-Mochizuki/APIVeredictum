const express = require('express');
const router = express.Router();
const obralistausuarioController = require('../controllers/obralistausuarioController');

router.get('/', obralistausuarioController.getAll);
router.post('/', obralistausuarioController.createItem);
router.delete('/', obralistausuarioController.deleteAssociative);

module.exports = router;