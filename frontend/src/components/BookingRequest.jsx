import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import axios from "axios";

const BookingRequest = () => {
  const { venueId } = useParams();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [eventDetails, setEventDetails] = useState("");
  const [venue, setVenue] = useState(location.state?.venue || {});

  useEffect(() => {
    if (!venue.name) {
      const fetchVenue = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/venues/${venueId}`);
          setVenue(response.data);
        } catch (error) {
          console.error("Error fetching venue details:", error);
        }
      };
      fetchVenue();
    }
  }, [venueId, venue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingRequest = {
      venueId: venueId,
      date: selectedDate,
      timeSlots: selectedTimeSlots,
      eventDetails: eventDetails,
      //status: 'pending' // Set status to pending
    };

    try {
      const response = await axios.post("http://localhost:5000/api/bookings", bookingRequest);
      console.log("Booking Request Submitted: ", response.data);
      alert("Booking request submitted successfully!");
    } catch (error) {
      console.error("Error submitting booking request:", error);
      alert("Failed to submit booking request.");
    }
  };

  const timeSlots = ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00"];

  return (
    <Container>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h4" gutterBottom>
          Book Venue: {venue.name}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} width="100%" maxWidth="500px">
          <TextField
            fullWidth
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Time Slots</InputLabel>
            <Select
              multiple
              value={selectedTimeSlots}
              onChange={(e) => setSelectedTimeSlots(e.target.value)}
              input={<OutlinedInput label="Time Slots" />}
              renderValue={(selected) => selected.join(", ")}
              required
            >
              {timeSlots.map((timeSlot) => (
                <MenuItem key={timeSlot} value={timeSlot}>
                  <Checkbox checked={selectedTimeSlots.indexOf(timeSlot) > -1} />
                  <ListItemText primary={timeSlot} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Event Details"
            multiline
            rows={4}
            value={eventDetails}
            onChange={(e) => setEventDetails(e.target.value)}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit Booking Request
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default BookingRequest;
