import React, { useState} from "react";
import { Box, Typography, TextField, Button, Paper, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../utils/headers";  // Import Axios instance
const Login = ({setIsAuthenticated}) => {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Update form data state when user types in input fields
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to Django backend
      const response = await api.post("auth/login/", {
        username: formData.name,
        password: formData.password,
      });

      console.log(response, "RES"); // Debugging log

      // Ensure response data exists before destructuring
      if (response?.data) {
        const { access, refresh, user, message } = response.data;

        // Store authentication tokens and user data in local storage
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", "true"); // Ensure it's stored as a string

        // Update authentication state and show success message
        setIsAuthenticated(true);
        setSnackbar({ open: true, message: message || "Login successful", severity: "success" });

        // Redirect user to tasks page after successful login
        navigate("/tasks");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);

      // Handle cases where error response is missing or malformed
      const errorMessage = error.response?.data?.message || error.response?.data?.detail || "Login failed. Please try again.";
      
      // Show error message in snackbar
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper elevation={3} sx={{ padding: 4, width: 400, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>Login to Task Management App</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            variant="outlined"
            margin="normal"
            required
            value={formData.name}
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>
        </form>
        <Typography variant="body2" mt={2}>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </Typography>
      </Paper>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};
export default Login;