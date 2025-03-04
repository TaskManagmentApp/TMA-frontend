import React from 'react';
import { Box, Container, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Alice Johnson",
    review: "TaskMaster transformed the way I organize my tasks. A game-changer!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Michael Smith",
    review: "Amazing tool! It keeps my team and I on track effortlessly.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Sarah Williams",
    review: "Simple, effective, and intuitive. Highly recommend it!",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg"
  }
];

const Testimonials = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: "#f8f9fa" }}>
      <Container>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          What Our Users Say
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ textAlign: 'center', p: 3 }}>
                  <Avatar src={testimonial.avatar} sx={{ width: 60, height: 60, margin: 'auto' }} />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{testimonial.name}</Typography>
                    <Typography variant="body1" color="textSecondary" mt={1}>
                      "{testimonial.review}"
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

export default Testimonials;
