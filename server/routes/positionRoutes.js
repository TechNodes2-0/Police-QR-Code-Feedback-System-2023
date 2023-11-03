const express = require('express');
const router = express.Router();
const positionController = require('../controllers/positionControllers');

// Route to list all positions
router.get('/positions', positionController.listPositions);

// Route to insert positions (use this route to populate positions in the database)
router.post('/insert', positionController.insertPositions);
router.get('/:id', positionController.getPositionById);

module.exports = router;
