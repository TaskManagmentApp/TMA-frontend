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
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Fix Login Bug", description: "Resolve login issue", dueDate: "2024-03-01", priority: "High", status: "In Progress", project: "Website Redesign" },
    { id: 2, title: "Design Homepage", description: "Create homepage layout", dueDate: "2024-03-05", priority: "Medium", status: "Pending", project: "E-commerce App" },
    { id: 3, title: "Optimize Database", description: "Improve query performance", dueDate: "2024-03-10", priority: "High", status: "Completed", project: "Internal Dashboard" },
    { id: 4, title: "Create API Endpoints", description: "Develop REST API", dueDate: "2024-03-15", priority: "Low", status: "Pending", project: "Mobile App" }
  ]);

  const [projects] = useState(["Website Redesign", "E-commerce App", "Internal Dashboard", "Mobile App"]);
  const [statusOptions] = useState(["Pending", "In Progress", "Completed"]);
  const [priorityOptions] = useState(["High", "Medium", "Low"]);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState({ id: null, title: "", description: "", dueDate: "", priority: "Medium", status: "Pending", project: "" });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleOpen = () => {
    setCurrentTask({ id: null, title: "", description: "", dueDate: "", priority: "Medium", status: "Pending", project: "" });
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
        <Typography variant="h4">Task List</Typography>
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
                <Typography variant="body2"><strong>Project:</strong> {task.project}</Typography>
                <Chip label={task.status} color={task.status === "Pending" ? "warning" : task.status === "In Progress" ? "primary" : "success"} sx={{ mt: 2 }} />
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

          {/* Priority Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select value={currentTask.priority} onChange={(e) => setCurrentTask({ ...currentTask, priority: e.target.value })}>
              {priorityOptions.map((priority, index) => (
                <MenuItem key={index} value={priority}>{priority}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Status Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select value={currentTask.status} onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })}>
              {statusOptions.map((status, index) => (
                <MenuItem key={index} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Project Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Project</InputLabel>
            <Select value={currentTask.project} onChange={(e) => setCurrentTask({ ...currentTask, project: e.target.value })}>
              {projects.map((project, index) => (
                <MenuItem key={index} value={project}>{project}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaskManagement;