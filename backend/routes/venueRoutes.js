const express = require('express');
const { getVenues, createVenue, getVenue } = require('../controllers/venueController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getVenues);
router.post('/', authMiddleware, createVenue); // Admin functionality
router.get('/:id', getVenue);

module.exports = router;
