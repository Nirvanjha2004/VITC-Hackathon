const Venue = require('../models/Venue');

// Get all venues
exports.getVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new venue (admin functionality)
exports.createVenue = async (req, res) => {
  try {
    const { name, capacity, location } = req.body;
    const venue = new Venue({ name, capacity, location });
    await venue.save();
    res.status(201).json({ message: 'Venue created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get individual venue details
exports.getVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    res.json(venue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
