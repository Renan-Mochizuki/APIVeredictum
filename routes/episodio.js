const express = require('express');
const router = express.Router();
const episodioController = require('../controllers/episodioController');

router.get('/', episodioController.getEpisodios);
router.get('/:id', episodioController.getEpisodioById);
router.post('/', episodioController.createEpisodio);
router.put('/:id', episodioController.updateEpisodio);
router.delete('/:id', episodioController.deleteEpisodio);

module.exports = router;
