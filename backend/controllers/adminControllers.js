const Booking = require('../models/Booking');
const User = require('../models/User'); // Add this line to import the User model
// const mailgun = require('mailgun-js');
// const DOMAIN = 'sandbox1b6275aa43634600ab3c3619575bf280.mailgun.org';
// const mg = mailgun({ apiKey: 'be2cdf7fab0073b5a03a70de136102b9-7a3af442-83ba8c10', domain: DOMAIN });

// const sendApprovalEmail = async (booking, userEmail) => {
//   const data = {
//     from: 'your-email@yourdomain.com',
//     to: userEmail,
//     subject: 'Booking Approved',
//     text: `Hi , your booking  has been approved.`,
//   };
//   await mg.messages().send(data);
// };

// const sendRejectionEmail = async (booking, userEmail) => {
//   const data = {
//     from: 'your-email@yourdomain.com',
//     to: userEmail,
//     subject: 'Booking Rejected',
//     text: `Hi  your booking has been rejected.`,
//   };
//   await mg.messages().send(data);
// };


const getUserEmail = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user.email;
  } catch (error) {
    console.error('Error fetching user email:', error);
    throw error;
  }
};

// Approve Booking
exports.approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    const userId = booking.user;
    const userEmail = await getUserEmail(userId);
    booking.status = 'approved';
    await booking.save();
    
    console.log("email:", userEmail);
    
    res.status(200).json({ message: 'Booking approved', booking });
    // sendApprovalEmail(booking, userEmail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject Booking
exports.rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    booking.status = 'rejected';
    await booking.save();
    const userId = booking.user;
    const userEmail = await getUserEmail(userId);
    
    res.status(200).json({ message: 'Booking rejected', booking });
    //await sendRejectionEmail(booking, userEmail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookingRequests = async (req, res) => {
  try {
    const bookings = await Booking.find({ status: 'pending' }).populate('venue');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUpcomingEvents = async (req, res) => {
  try {
    const events = await Booking.find({ status: 'approved', date: { $gte: new Date() } }).populate('venue');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVenueSchedules = async (req, res) => {
  try {
    const venues = await Venue.find();
    const schedules = await Promise.all(venues.map(async (venue) => {
      const events = await Booking.find({ venue: venue._id, status: 'approved' });
      return {
        id: venue._id,
        venueName: venue.name,
        events: events.map(event => ({
          eventName: event.eventName,
          date: event.date,
          time: event.timeSlot
        }))
      };
    }));
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};