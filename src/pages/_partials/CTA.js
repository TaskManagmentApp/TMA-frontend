import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";

const CTA = () => {
  return (
    <Box
      sx={{
        py: 10,
        background: "linear-gradient(135deg, #0d47a1, #42a5f5)",
        textAlign: "center",
        color: "white",
      }}
    >
      <Container>
        <Typography variant="h4" fontWeight="bold">
          Take Control of Your Tasks Today!
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Sign up now and boost your productivity.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          component={Link} to="/register"
          sx={{ mt: 4 }}
        >
          Signup
        </Button>
      </Container>
    </Box>
  );
};

export default CTA;
