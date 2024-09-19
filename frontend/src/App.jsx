import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import BookingHistory from './components/BookingHistory';
import AdminDashboard from './components/AdminDashboard';
import AvailableVenues from './components/AvailableVenues';
import BookingRequest from './components/BookingRequest';
import axios from 'axios';
import PrivateRoute1, { PrivateRoute2 } from '../utils/PrivateRoutes';

// Set up axios to always include the token in the Authorization header
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const App = () => {

  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute1/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<BookingHistory />} />
          <Route path="/book/:venueId" element={<BookingRequest />} />
          <Route path="/available-venues" element={<AvailableVenues />} />
        </Route>
        <Route element={<PrivateRoute2/>}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
