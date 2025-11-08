const express = require('express');
const router = express.Router();
const paisController = require('../controllers/paisController');

router.get('/', paisController.getAll);

module.exports = router;
