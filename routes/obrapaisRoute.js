const express = require('express');
const router = express.Router();
const obrapaisController = require('../controllers/obrapaisController');

router.get('/', obrapaisController.getAll);
router.post('/', obrapaisController.createItem);
router.delete('/', obrapaisController.deleteAssociative);

module.exports = router;