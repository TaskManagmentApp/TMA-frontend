import React, { useEffect,useState } from "react";
import {
  Container,Grid,Card,CardContent,Typography,Chip,
  Button,Dialog,DialogActions,DialogContent,
  DialogTitle,TextField,Menu,MenuItem,IconButton,
  Box, Snackbar,Alert,Select,FormControl,InputLabel,CircularProgress,
} from "@mui/material";
import { FormHelperText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "../utils/headers"; // Your axios instance

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusOptions] = useState(["Pending", "In Progress", "Completed"]);
  const [priorityOptions] = useState(["High", "Medium", "Low"]);
  const [errors, setErrors] = useState({});

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState({ id: null, title: "", description: "", dueDate: "", priority: "Medium", status: "Pending", project: "" });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const userData = JSON.parse(localStorage.getItem("userData"));

   // Fetch Projects on Component Mount
  useEffect(() => {
    
    axios.get("/projects/list/")
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load projects");
        setLoading(false);
    });
    axios.get("/projects/tasks/list/")
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load tasks");
        setLoading(false);
      });
  }, []);
  // Validation function
  const validate = () => {
    let newErrors = {};

    if (!currentTask.title) newErrors.title = "Title is required";
    if (!currentTask.description) newErrors.description = "Description is required";
    if (!currentTask.due_date) newErrors.due_date = "Due date is required";
    if (!currentTask.priority) newErrors.priority = "Priority is required";
    if (!currentTask.status) newErrors.status = "Status is required";
    if (!currentTask.project) newErrors.project = "Project is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
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

  const handleDelete = async (id) => {
    try {
      // 🟢 Call the DELETE API
      await axios.delete(`/projects/tasks/delete/${id}/`);
  
      // 🟢 Remove the deleted task from state
      setTasks(tasks.filter((task) => task.id !== id));
  
      setSnackbar({ open: true, message:"Task Deleted Successfully", severity: "success" });

    } catch (error) {
      console.error("Error deleting task:", error);
      setSnackbar({ open: true, message:"Failed to delete task", severity: "error" });
    }
  
    handleCloseMenu();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (!validate()) return; // Stop if validation fails

    if (editMode) {
      const response = await axios.put(`/projects/tasks/update/${currentTask.id}/`, {
        title: currentTask.title,
        description: currentTask.description,
        due_date: currentTask.due_date,
        priority: currentTask.priority, // "Low", "Medium", "High"
        status: currentTask.status, // "Pending", "In Progress", "Completed"
        project: currentTask.project, // Must be a valid project ID
      });
      setTasks(tasks.map((task) => (task.id === currentTask.id ? response.data : task)));
      setSnackbar({ open: true, message:"Task Updated Successfully", severity: "success" });
      setOpen(false);
    } else {
      try {
        const response = await axios.post("/projects/tasks/create/", {
          title: currentTask.title,
          description: currentTask.description,
          due_date: currentTask.due_date,
          priority: currentTask.priority, // "Low", "Medium", "High"
          status: currentTask.status, // "Pending", "In Progress", "Completed"
          project: currentTask.project, // Must be a valid project ID
        });
  
        // Add the new task from API response
        setTasks([...tasks, response.data]);
        setSnackbar({ open: true, message:"Task Added Successfully", severity: "success" });
        setOpen(false);
      } catch (error) {
        console.error("Error adding task:", error);
        setSnackbar({ open: true, message:"Failed to add task", severity: "error" });
      }
    }
  };

  const handleClickMenu = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };
  if (loading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
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
            {userData?.role === "admin" && ( <IconButton
                aria-label="more"
                onClick={(event) => handleClickMenu(event, task.id)}
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <MoreVertIcon />
              </IconButton>
              )}
              {userData?.role === "admin" && (
                 <Menu anchorEl={anchorEl} open={Boolean(anchorEl) && selectedTaskId === task.id} onClose={handleCloseMenu}>
                <MenuItem onClick={() => handleEdit(task)}>Edit</MenuItem>
                <MenuItem onClick={() => handleDelete(task.id)}>Delete</MenuItem>
              </Menu>
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">{task.description}</Typography>
                <Typography variant="body2" mt={1}><strong>Due Date:</strong> {task.due_date}</Typography>
                <Typography variant="body2"><strong>Priority:</strong> {task.priority}</Typography>
                <Typography variant="body2"><strong>Project:</strong> {projects.find((p) => p.id === task.project)?.name || "Unknown Project"}</Typography>
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
          <TextField label="Title" fullWidth margin="normal" value={currentTask.title}
           onChange={(e) =>{
            setErrors({ ...errors, title: e.target.value ? "" : "Title is required" });
            setCurrentTask({ ...currentTask, title: e.target.value });
           }} 
           error={!!errors.title}
           helperText={errors.title}
          />
          <TextField label="Description" fullWidth multiline rows={3} margin="normal" 
            value={currentTask.description} 
            onChange={(e) =>{
              setErrors({ ...errors, description: e.target.value ? "" : "Description is required" });
              setCurrentTask({ ...currentTask, description: e.target.value });
             }} 
            error={!!errors.description}
            helperText={errors.description}
           />
          <TextField label="Due Date" type="date" fullWidth margin="normal" value={currentTask.due_date}
            onChange={(e) =>{
              setErrors({ ...errors, due_date: e.target.value ? "" : "Due Date is required" });
              setCurrentTask({ ...currentTask, due_date: e.target.value });
            }}  
            InputLabelProps={{ shrink: true }} 
            error={!!errors.due_date}
            helperText={errors.due_date}
          />

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
          <FormControl fullWidth margin="normal" error={!!errors.project}>
            <InputLabel>Project</InputLabel>
            <Select value={currentTask.project} 
             onChange={(e) =>{
              setErrors({ ...errors, project: e.target.value ? "" : "Project is required" });
              setCurrentTask({ ...currentTask, project: e.target.value });
            }}>
              {projects.map((project, index) => (
                <MenuItem key={index} value={project.id}>{project.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.project}</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
    </Container>
  );
};

export default TaskManagement;