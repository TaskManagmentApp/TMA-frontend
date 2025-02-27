import React from "react";
import { Container, Grid, Card, CardContent, Typography, Chip } from "@mui/material";

const tasks = [
  {
    id: 1,
    title: "Fix Login Bug",
    description: "Resolve the issue where users can't log in.",
    dueDate: "2024-03-01",
    priority: "High",
    status: "In Progress",
    category: "Backend",
  },
  {
    id: 2,
    title: "Design Homepage",
    description: "Create a modern homepage layout.",
    dueDate: "2024-03-05",
    priority: "Medium",
    status: "Pending",
    category: "Frontend",
  },
  {
    id: 3,
    title: "Database Optimization",
    description: "Improve query performance.",
    dueDate: "2024-03-10",
    priority: "High",
    status: "Completed",
    category: "Database",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "In Progress":
      return "warning";
    case "Pending":
      return "error";
    case "Completed":
      return "success";
    default:
      return "default";
  }
};

const LandingPage = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Task Management System
      </Typography>

      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card sx={{ p: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {task.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.description}
                </Typography>
                <Typography variant="body2" mt={1}>
                  <strong>Due Date:</strong> {task.dueDate}
                </Typography>
                <Typography variant="body2">
                  <strong>Priority:</strong> {task.priority}
                </Typography>
                <Typography variant="body2">
                  <strong>Category:</strong> {task.category}
                </Typography>
                <Chip label={task.status} color={getStatusColor(task.status)} sx={{ mt: 2 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LandingPage;
