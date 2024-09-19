const express = require('express');
const { createBooking, getUserBookings } = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.get('/getBookings', authMiddleware, getUserBookings);

module.exports = router;
