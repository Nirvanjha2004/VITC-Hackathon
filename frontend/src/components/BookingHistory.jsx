import { Container, Typography, Box, Paper, Grid, Chip, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // assuming you're using react-router-dom for navigation

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    console.log("Get bookings called")
    axios.get('http://localhost:5000/api/bookings/getBookings')
      .then(response => {
        console.log(response.data)
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleLogout = () => {
    // Clear authentication token (if stored in cookies or localStorage)
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Redirect to login page
    navigate('/login');
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        py: 4
      }}
    >
      <Container maxWidth="md">
        {/* Logout Button */}
        <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          Your Booking History
        </Typography>
        <Grid container spacing={3}>
          {bookings.map(booking => (
            <Grid item xs={12} key={booking._id}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {booking.eventName}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      Date: {new Date(booking.date).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      Time: {booking.timeSlot}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      Venue: {booking.venue.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Chip
                      label={booking.status}
                      color={getStatusColor(booking.status)}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BookingHistory;
