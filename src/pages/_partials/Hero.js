import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(135deg, #1976D2, #90CAF9)",
        color: "white",
        padding: "20px",
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" fontWeight="bold">
            Organize. Prioritize. Succeed.
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h5" sx={{ marginTop: 2 }}>
            A smart task management tool to boost your productivity.
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 4 }}
            component={Link}
            to="/register"
          >
            Signup
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero;
