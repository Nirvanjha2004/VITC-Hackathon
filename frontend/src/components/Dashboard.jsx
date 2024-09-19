import { Container, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="h6" gutterBottom>
          Manage Your Bookings
        </Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary" component={Link} to="/history">
            View Booking History
          </Button>
          <Button variant="contained" color="secondary" sx={{ ml: 2 }} onClick={() => {
            navigate('/available-venues');
          }}>
            New Booking
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
