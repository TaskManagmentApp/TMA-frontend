import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper,Select,FormControl,InputLabel,MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    address:"",
    role:"standard"
  });
  const [roles] = useState(["admin", "standard"]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example registration success alert
    Swal.fire({
      icon: "success",
      title: "Account Created!",
      text: "Your account has been successfully registered.",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 400, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Create an Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            name="username"
            variant="outlined"
            margin="normal"
            required
            value={formData.username}
            onChange={handleChange}
          />
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
            label="Phone Number"
            name="phoneNumber"
            variant="outlined"
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            variant="outlined"
            margin="normal"
            required
            value={formData.address}
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select>
              {roles.map((role, index) => (
                <MenuItem key={index} value={role}>{role}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Signup
          </Button>
        </form>
        <Typography variant="body2" mt={2}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
