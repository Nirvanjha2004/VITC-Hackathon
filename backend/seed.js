const mongoose = require('mongoose');
const Venue = require('./models/Venue');
const dotenv = require('dotenv');

dotenv.config();

const venues = [
  {
    name: 'Auditorium A',
    capacity: 100,
    location: 'Building 1, Floor 2',
    availability: 'available',
    description: 'A large auditorium suitable for conferences and lectures.',
    bookingStatus: [
      {
        date: new Date('2024-09-15'),
        timeSlot: '09:00 - 11:00',
        status: 'booked'
      },
      {
        date: new Date('2024-09-15'),
        timeSlot: '11:00 - 13:00',
        status: 'available'
      }
    ]
  },
  {
    name: 'Meeting Room 3',
    capacity: 20,
    location: 'Building 2, Floor 1',
    availability: 'available',
    description: 'A small meeting room for team discussions.',
    bookingStatus: [
      {
        date: new Date('2024-09-15'),
        timeSlot: '09:00 - 10:00',
        status: 'available'
      },
      {
        date: new Date('2024-09-15'),
        timeSlot: '10:00 - 11:00',
        status: 'available'
      }
    ]
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    await Venue.deleteMany();
    console.log('Existing venues deleted');

    await Venue.insertMany(venues);
    console.log('New venues inserted');

    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

seedData();
