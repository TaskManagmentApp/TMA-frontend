import React from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { CheckCircle, Alarm, People } from "@mui/icons-material";

const features = [
  {
    title: "Task Scheduling",
    description: "Plan and organize your tasks seamlessly.",
    icon: <CheckCircle color="primary" fontSize="large" />,
  },
  {
    title: "Reminders & Alerts",
    description: "Never miss a deadline with automated alerts.",
    icon: <Alarm color="secondary" fontSize="large" />,
  },
  {
    title: "Team Collaboration",
    description: "Work efficiently with team features.",
    icon: <People color="action" fontSize="large" />,
  },
];

const Features = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: "#f5f5f5" }}>
      <Container>
        <Typography variant="h4" align="center" fontWeight="bold" mb={4}>
          Key Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ textAlign: "center", p: 3 }}>
                  <CardContent>
                    {feature.icon}
                    <Typography variant="h6" fontWeight="bold" mt={2}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" mt={1} color="textSecondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
