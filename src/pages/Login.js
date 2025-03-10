import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  const adminUser = {
    email: "admin@gmail.com",
    password: "123456"
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email === adminUser.email && formData.password === adminUser.password) {
      setSnackbar({ open: true, message: "Login Successful! Redirecting...", severity: "success" });

      setTimeout(() => {
        navigate("/tasks"); // Redirect to tasks page
      }, 2000);
    } else {
      setSnackbar({ open: true, message: "Invalid Credentials!", severity: "error" });
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
          Don't have an account? <Link to="/register">Sign Up</Link>
        </Typography>
      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Show on top-right
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
