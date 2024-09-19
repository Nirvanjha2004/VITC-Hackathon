const Booking = require('../models/Booking');

// Create Booking

exports.createBooking = async (req, res) => {
  console.log("createBooking function called");
  try {
    const { venueId, date, timeSlots, eventDetails } = req.body;
    const booking = new Booking({
      user: req.userId,
      venue: venueId,
      date,
      timeSlot: timeSlots.join(", "),
      eventName: eventDetails,
      status: 'pending' // Set status to pending
    });
    await booking.save();
    res.status(201).json({ message: 'Booking request submitted', booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    console.log("getUserBookings function called");
    const bookings = await Booking.find({ user: req.userId });
    console.log(bookings[0].eventName);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
