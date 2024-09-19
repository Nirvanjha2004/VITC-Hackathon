const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VenueSchema = new Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  location: { type: String, required: true },
  availability: { type: String, enum: ['available', 'booked'], required: true },
  description: { type: String },
  bookingStatus: [
    {
      date: { type: Date, required: true },
      timeSlot: { type: String, required: true },
      status: { type: String, enum: ['available', 'booked'], required: true }
    }
  ]
});

module.exports = mongoose.model('Venue', VenueSchema);
