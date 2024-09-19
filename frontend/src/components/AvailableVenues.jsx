import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VenueAvailability = () => {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");

  const navigate = useNavigate();

  const handleBookingClick = (venue) => {
    navigate(`/book/${venue._id}`, { state: { venue } });
  };

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/venues");
        setVenues(response.data);
        setFilteredVenues(response.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, []);

  useEffect(() => {
    const filterVenues = () => {
      const filtered = venues.filter((venue) => {
        return (
          (capacity ? venue.capacity >= parseInt(capacity) : true) &&
          (location
            ? venue.location.toLowerCase().includes(location.toLowerCase())
            : true) &&
          (availability ? venue.availability === availability : true)
        );
      });
      setFilteredVenues(filtered);
    };

    filterVenues();
  }, [capacity, location, availability, venues]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Venue Availability
      </Typography>

      <Box my={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              label="Capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="50">50</MenuItem>
              <MenuItem value="100">100</MenuItem>
              <MenuItem value="200">200</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              label="Availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="booked">Booked</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {filteredVenues.map((venue) => (
          <Grid item xs={12} sm={6} md={4} key={venue._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{venue.name}</Typography>
                <Typography variant="body2">
                  Capacity: {venue.capacity}
                </Typography>
                <Typography variant="body2">
                  Location: {venue.location}
                </Typography>
                <Typography variant="body2">
                  Status: {venue.availability}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleBookingClick(venue)}
                  disabled={venue.availability === "booked"}
                >
                  {venue.availability === "available" ? "Book Now" : "Booked"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VenueAvailability;
