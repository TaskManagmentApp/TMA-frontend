import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../utils/headers"; // Import Axios instance

const Register = ({ setIsAuthenticated }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    role: "standard",
  });

  const [errors, setErrors] = useState({});
  const [roles] = useState(["admin", "standard"]);
  const [loading, setLoading] = useState(false);

  // Validation function
  const validate = () => {
    let newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: e.target.value ? "" : `${e.target.label} is required` });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Stop submission if validation fails

    setLoading(true);

    try {
      const response = await api.post("auth/users/create/", formData);

      if (response.status === 201) {
        const { tokens, user, message } = response.data;

        localStorage.setItem("access_token", tokens.access);
        localStorage.setItem("refresh_token", tokens.refresh);
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);

        setSnackbar({
          open: true,
          message: message || "Registration successful",
          severity: "success",
        });

        navigate("/tasks");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.detail || "An error occurred. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper elevation={3} sx={{ padding: 4, width: 400, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Create an Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="username"
            variant="outlined"
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            variant="outlined"
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            variant="outlined"
            margin="normal"
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select name="role" value={formData.role} onChange={handleChange}>
              {roles.map((role, index) => (
                <MenuItem key={index} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? "Signing Up..." : "Signup"}
          </Button>
        </form>
        <Typography variant="body2" mt={2}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>

      {/* Snackbar for messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
