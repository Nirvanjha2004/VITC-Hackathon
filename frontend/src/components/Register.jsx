import { Container, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    console.log(username, email, password, confirmPassword);
  };

  axios.post("http://localhost:5000/api/auth/register", { username, email, password })
    .then(response => {
      console.log("Registration successful and the jwt token is: ", response.data);
    })
    .catch(error => {
      console.log(error);
    });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Student Registration
      </Typography>
      <form>
        <TextField fullWidth label="Username" margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <TextField fullWidth label="Confirm Password" type="password" margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
