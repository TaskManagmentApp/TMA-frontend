import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
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
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/register"
          >
            Get Started
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
