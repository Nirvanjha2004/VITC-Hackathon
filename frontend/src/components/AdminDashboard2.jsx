import { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, List, ListItem, ListItemText, Button, Grid } from '@mui/material';

const AdminDashboard2 = () => {
  const [tabValue, setTabValue] = useState(0);

  // Dummy data for Booking Requests
  const bookingRequests = [
    { id: 1, eventName: 'Tech Conference', date: '2023-06-15', venue: 'Main Hall', status: 'Pending' },
    { id: 2, eventName: 'Art Exhibition', date: '2023-06-20', venue: 'Gallery', status: 'Pending' },
    { id: 3, eventName: 'Music Festival', date: '2023-07-01', venue: 'Outdoor Stage', status: 'Pending' },
  ];

  // Dummy data for Upcoming Events
  const upcomingEvents = [
    { id: 1, eventName: 'Annual Gala', date: '2023-06-30', venue: 'Grand Ballroom' },
    { id: 2, eventName: 'Science Fair', date: '2023-07-05', venue: 'Exhibition Center' },
    { id: 3, eventName: 'Career Workshop', date: '2023-07-10', venue: 'Seminar Room' },
  ];

  // Dummy data for Venue Schedules
  const venueSchedules = [
    {
      id: 1,
      venueName: 'Main Hall',
      events: [
        { eventName: 'Tech Conference', date: '2023-06-15', time: '09:00 AM - 05:00 PM' },
        { eventName: 'Job Fair', date: '2023-06-18', time: '10:00 AM - 04:00 PM' },
      ]
    },
    {
      id: 2,
      venueName: 'Gallery',
      events: [
        { eventName: 'Art Exhibition', date: '2023-06-20', time: '11:00 AM - 07:00 PM' },
        { eventName: 'Photography Showcase', date: '2023-06-25', time: '10:00 AM - 06:00 PM' },
      ]
    },
    {
      id: 3,
      venueName: 'Outdoor Stage',
      events: [
        { eventName: 'Music Festival', date: '2023-07-01', time: '02:00 PM - 11:00 PM' },
        { eventName: 'Summer Concert', date: '2023-07-08', time: '06:00 PM - 10:00 PM' },
      ]
    },
  ];

  const handleApprove = (id) => {
    console.log(`Approved booking request with id: ${id}`);
    // In a real application, you would update the state here
  };

  const handleReject = (id) => {
    console.log(`Rejected booking request with id: ${id}`);
    // In a real application, you would update the state here
  };

  const renderBookingRequests = () => (
    <List>
      {bookingRequests.map((request) => (
        <ListItem key={request.id}>
          <ListItemText
            primary={`${request.eventName} - ${request.date}`}
            secondary={`Venue: ${request.venue}, Status: ${request.status}`}
          />
          <Button onClick={() => handleApprove(request.id)} color="primary" variant="contained" sx={{ mr: 1 }}>
            Approve
          </Button>
          <Button onClick={() => handleReject(request.id)} color="secondary" variant="contained">
            Reject
          </Button>
        </ListItem>
      ))}
    </List>
  );

  const renderUpcomingEvents = () => (
    <List>
      {upcomingEvents.map((event) => (
        <ListItem key={event.id}>
          <ListItemText
            primary={event.eventName}
            secondary={`Date: ${event.date}, Venue: ${event.venue}`}
          />
        </ListItem>
      ))}
    </List>
  );

  const renderVenueSchedules = () => (
    <Grid container spacing={2}>
      {venueSchedules.map((schedule) => (
        <Grid item xs={12} sm={6} md={4} key={schedule.id}>
          <Typography variant="h6">{schedule.venueName}</Typography>
          <List>
            {schedule.events.map((event, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={event.eventName}
                  secondary={`Date: ${event.date}, Time: ${event.time}`}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)}>
          <Tab label="Booking Requests" />
          <Tab label="Upcoming Events" />
          <Tab label="Venue Schedules" />
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {tabValue === 0 && renderBookingRequests()}
          {tabValue === 1 && renderUpcomingEvents()}
          {tabValue === 2 && renderVenueSchedules()}
        </Box>
      </Box>
    </Container>
  );
};

export default AdminDashboard2;
