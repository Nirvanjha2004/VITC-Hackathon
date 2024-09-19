const express = require('express');
const { approveBooking, rejectBooking, getBookingRequests } = require('../controllers/adminControllers');
const router = express.Router();

router.post('/approve-booking/:id', approveBooking);
router.post('/reject-booking/:id', rejectBooking);

console.log("adminRouter called")
router.get('/booking-requests', getBookingRequests);
// router.get('/upcoming-events', getUpcomingEvents);
// router.get('/venue-schedules', getVenueSchedules);

module.exports = router;