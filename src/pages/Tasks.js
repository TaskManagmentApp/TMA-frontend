import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Menu,
  MenuItem,
  IconButton,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Fix Login Bug", description: "Resolve the issue where users can't log in.", dueDate: "2024-03-01", priority: "High", status: "In Progress", category: "Backend" },
    { id: 2, title: "Design Homepage", description: "Create a modern homepage layout.", dueDate: "2024-03-05", priority: "Medium", status: "Pending", category: "Frontend" },
    { id: 3, title: "Database Optimization", description: "Improve query performance.", dueDate: "2024-03-10", priority: "High", status: "Completed", category: "Database" },
  ]);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState({ id: null, title: "", description: "", dueDate: "", priority: "", status: "" });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleOpen = () => {
    setCurrentTask({ id: null, title: "", description: "", dueDate: "", priority: "", status: "" });
    setEditMode(false);
    setOpen(true);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setEditMode(true);
    setOpen(true);
    handleCloseMenu();
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    showSnackbar("Task deleted successfully!", "error");
    handleCloseMenu();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (editMode) {
      setTasks(tasks.map((task) => (task.id === currentTask.id ? currentTask : task)));
      showSnackbar("Task updated successfully!", "info");
    } else {
      setTasks([...tasks, { ...currentTask, id: tasks.length + 1 }]);
      showSnackbar("Task added successfully!", "success");
    }
    setOpen(false);
  };

  const handleClickMenu = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Task Management System</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>Add New Task</Button>
      </Box>

      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card sx={{ p: 2, boxShadow: 3, position: "relative" }}>
              <IconButton
                aria-label="more"
                onClick={(event) => handleClickMenu(event, task.id)}
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl) && selectedTaskId === task.id} onClose={handleCloseMenu}>
                <MenuItem onClick={() => handleEdit(task)}>Edit</MenuItem>
                <MenuItem onClick={() => handleDelete(task.id)}>Delete</MenuItem>
              </Menu>
              <CardContent>
                <Typography variant="h6" gutterBottom>{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">{task.description}</Typography>
                <Typography variant="body2" mt={1}><strong>Due Date:</strong> {task.dueDate}</Typography>
                <Typography variant="body2"><strong>Priority:</strong> {task.priority}</Typography>
                <Typography variant="body2"><strong>Status:</strong> {task.status}</Typography>
                <Chip label={task.status} color="primary" sx={{ mt: 2 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Task Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Edit Task" : "Add New Task"}</DialogTitle>
        <DialogContent>
          <TextField label="Title" fullWidth margin="normal" value={currentTask.title} onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })} />
          <TextField label="Description" fullWidth multiline rows={3} margin="normal" value={currentTask.description} onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })} />
          <TextField label="Due Date" type="date" fullWidth margin="normal" value={currentTask.dueDate} onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })} InputLabelProps={{ shrink: true }} />
          <TextField label="Priority" fullWidth margin="normal" value={currentTask.priority} onChange={(e) => setCurrentTask({ ...currentTask, priority: e.target.value })} />
          <TextField label="Status" fullWidth margin="normal" value={currentTask.status} onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TaskManagement;