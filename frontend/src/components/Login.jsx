import { Container, TextField, Button, Typography, Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { signinSuccess } from "../features/counter/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const endpoint = userType === "admin" ? "admin/login" : "login";
    
    axios.post(`http://localhost:5000/api/auth/${endpoint}`, { username, password })
      .then(response => {
        console.log("Login response:", response.data);
        const token = response.data.token;
        
        if (token) {
          // Set the token in a cookie
          Cookies.set('token', token);
          Cookies.set('userType', userType);

          // Set the token in the Authorization header for future requests
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Dispatch login success with token and user type
          dispatch(signinSuccess({ token, userType }));
          
          // Navigate based on user type
          navigate(userType === "admin" ? "/adminDashboard" : "/dashboard");
          
          console.log("Login successful, token set in cookie and Authorization header");
        } else {
          console.error("Token not received in response");
        }
      })
      .catch(error => {
        console.error("Error during login: ", error.response ? error.response.data : error.message);
      });
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        maxWidth="400px"
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Tabs value={userType} onChange={(e, newValue) => setUserType(newValue)} sx={{ mb: 2 }}>
          <Tab label="Student" value="student" />
          <Tab label="Admin" value="admin" />
        </Tabs>
        <Box component="form" width="100%">
          <TextField fullWidth label="Username" margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
            Login as {userType === "admin" ? "Admin" : "Student"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
