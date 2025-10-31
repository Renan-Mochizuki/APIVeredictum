const express = require('express');
const router = express.Router();
const episodioController = require('../controllers/episodioController');

router.get('/', episodioController.getEpisodios);
router.get('/:id', episodioController.getEpisodioById);
router.post('/', episodioController.createEpisodio);

module.exports = router;
