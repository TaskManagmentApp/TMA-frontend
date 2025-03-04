import React from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const SocialMedia = () => {
  return (
    <Box sx={{ py: 5, background: "#f5f5f5", textAlign: "center" }}>
      <Container>
        <Typography variant="h5" fontWeight="bold">
          Follow Us
        </Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
          <IconButton color="primary">
            <Facebook fontSize="large" />
          </IconButton>
          <IconButton color="primary">
            <Twitter fontSize="large" />
          </IconButton>
          <IconButton color="primary">
            <Instagram fontSize="large" />
          </IconButton>
          <IconButton color="primary">
            <LinkedIn fontSize="large" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default SocialMedia;
