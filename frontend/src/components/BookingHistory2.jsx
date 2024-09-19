import { Container, Typography, Box, Paper, Chip } from '@mui/material';
import { useState, useEffect } from 'react';

const BookingHistory2 = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Dummy data for bookings
    const dummyBookings = [
      {
        _id: '1',
        date: '2023-06-15',
        time: '10:00 AM - 12:00 PM',
        location: 'Conference Room A',
        eventName: 'Team Meeting',
        status: 'approved'
      },
      {
        _id: '2',
        date: '2023-06-20',
        time: '2:00 PM - 4:00 PM',
        location: 'Auditorium',
        eventName: 'Product Launch',
        status: 'pending'
      },
      {
        _id: '3',
        date: '2023-06-25',
        time: '9:00 AM - 11:00 AM',
        location: 'Meeting Room 101',
        eventName: 'Client Presentation',
        status: 'approved'
      },
      {
        _id: '4',
        date: '2023-07-01',
        time: '1:00 PM - 3:00 PM',
        location: 'Lecture Hall B',
        eventName: 'Workshop',
        status: 'rejected'
      },
      {
        _id: '5',
        date: '2023-07-05',
        time: '11:00 AM - 1:00 PM',
        location: 'Conference Room B',
        eventName: 'Board Meeting',
        status: 'approved'
      }
    ];

    setBookings(dummyBookings);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom align="center">
          Your Booking History
        </Typography>
        {bookings.map(booking => (
          <Paper key={booking._id} elevation={3} sx={{ mb: 2, p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6">
                {booking.eventName}
              </Typography>
              <Chip 
                label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                color={getStatusColor(booking.status)}
                size="small"
              />
            </Box>
            <Typography variant="body1" gutterBottom>
              Date: {booking.date}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Time: {booking.time}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Location: {booking.location}
            </Typography>
          </Paper>
        ))}
      </Container>
    </Box>
  );
};

export default BookingHistory2;
