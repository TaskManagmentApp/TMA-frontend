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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send API request to Django backend for authentication
    try {
      const response =await api.post("auth/login/", {
        username: formData.name,
        password: formData.password,
      });
      // If login is successful, save the tokens to localStorage
      const { access, refresh,user,message } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("userData",JSON.stringify(user));
      localStorage.setItem("isAuthenticated",true);
      // Update the authentication state and show success snackbar
      setIsAuthenticated(true);
      // navi
      setSnackbar({ open: true, message:message, severity: "success" });
      // Redirect to the tasks page
       navigate("/tasks");
    } catch (error) {
      // If login fails, show error snackbar
      setSnackbar({ open: true, message: error.response?.data?.message ? error.response?.data?.message : error.response.data.detail, severity: "error" });
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