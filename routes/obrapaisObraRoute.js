const express = require('express');
const router = express.Router();
const obrapaisController = require('../controllers/obrapaisController');

router.get('/:id', obrapaisController.getByObraId);

module.exports = router;
