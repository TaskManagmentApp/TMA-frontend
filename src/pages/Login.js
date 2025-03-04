import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const dummyUser = {
    email: "admin@acme.com",
    password: "123456"
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email === dummyUser.email && formData.password === dummyUser.password) {
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Redirecting to tasks...",
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        navigate("/tasks"); // Redirect to tasks page
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials",
        text: "Please check your email and password.",
      });
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper elevation={3} sx={{ padding: 4, width: 400, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Login to Task Management App
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            margin="normal"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
        <Typography variant="body2" mt={2}>
          Don't have an account? <Link  to="/register">Sign Up</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
