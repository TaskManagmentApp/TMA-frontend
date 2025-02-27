import React from "react";
import { Container, Grid, Typography, Button, Paper, Box } from "@mui/material";
import taskImage from "../assets/task.jpg"; // Add an image in assets folder

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${taskImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
        p: 3,
      }}
    >
      {/* <Container>
        <Paper
          elevation={6}
          sx={{
            maxWidth: 600,
            mx: "auto",
            p: 4,
            bgcolor: "rgba(0, 0, 0, 0.7)",
            borderRadius: 2,
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
            Welcome to Task Manager
          </Typography>
          <Typography variant="body1" gutterBottom>
            Organize, track, and complete your tasks efficiently. Stay productive and manage your projects with ease.
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
            Get Started
          </Button>
        </Paper>
      </Container> */}
    </Box>
  );
};

export default Home;
