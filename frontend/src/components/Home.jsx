import { Typography, Button, Container, Box } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
  };
  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <Container className='flex justify-center bg-blacks items-center align-center'>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h2" align="center" gutterBottom>
          College Venue Booking System
        </Typography>
        <Typography variant="h5" align="center" paragraph>
          Easily book venues for your events with admin approval workflow.
        </Typography>
        <Box>
          <Button variant="contained" color="primary" component={Link} to="/login" onClick={handleLogin}>
            Login
          </Button>
          &nbsp;&nbsp;
          <Button variant="contained" color="secondary" component={Link} to="/register" onClick={handleRegister}>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
