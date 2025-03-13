import React, {  useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton, Snackbar, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "../../utils/headers"; // Your axios instance

const Navbar = ({ setIsAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();
  
  // Retrieve authentication status and user data from local storage
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userData = JSON.parse(localStorage.getItem("userData"));

  // Handle opening of the user menu (for profile/logout options)
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the user menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");

    // If no refresh token is found, assume user is already logged out
    if (!refreshToken) {
      setSnackbar({ open: true, message: "You are already logged out!", severity: "info" });
      setIsAuthenticated(false);
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post("/auth/logout/", { refresh: refreshToken });

      // Clear authentication data from local storage on successful logout
      localStorage.removeItem("userData");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("isAuthenticated");

      if (response.status === 205) {
        setSnackbar({ open: true, message: "User logged out successfully", severity: "success" });
        navigate("/login");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Logout failed:", error);

      // Handle logout error and display an appropriate message
      const errorMessage = error.response?.data?.message || "Logout failed! Please try again.";
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
    }
  };


  return (
    <>
      <AppBar position="sticky" color="primary" elevation={2}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", textDecoration: "none", color: "inherit" }} component={Link} to="/">
            Task Management App
          </Typography>

          <Box>
            {isAuthenticated ? (
              <>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <AccountCircleIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem onClick={handleMenuClose}>{userData?.username || "User"}</MenuItem>
                  <MenuItem onClick={() => navigate("/projects")}>Projects</MenuItem>
                  <MenuItem onClick={() => navigate("/tasks")}>Tasks</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Signup</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

export default Navbar;