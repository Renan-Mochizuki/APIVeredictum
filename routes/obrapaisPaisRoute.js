const express = require('express');
const router = express.Router();
const obrapaisController = require('../controllers/obrapaisController');

router.get('/:id', obrapaisController.getByPaisId);

module.exports = router;
