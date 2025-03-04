import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{ background: "#1a237e", color: "white", textAlign: "center", py: 2 }}
    >
      <Typography variant="body1">
        © 2025 TaskMaster. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
