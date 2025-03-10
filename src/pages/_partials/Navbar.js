import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" }); // Snackbar State
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const parsedUser = JSON.parse(loggedInUser);
        if (parsedUser && typeof parsedUser === "object" && parsedUser.name) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem("user");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("user");
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setSnackbar({ open: true, message: "Logout Successful!", type: "success" }); // ✅ Show Success Message
    navigate("/login");
  };

  // Snackbar Close Handler
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={2}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              textDecoration: "none",
              color: "inherit",
            }}
            component={Link}
            to="/"
          >
            Task Management App
          </Typography>

          <Box>
            {user ? (
              <>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <AccountCircleIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem onClick={handleMenuClose}>
                    {user.name ? user.name : "User"}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Signup
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Snackbar for Success/Error Messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000} // 3 Seconds
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.type} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar;