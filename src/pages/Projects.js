import React, { useEffect, useState } from "react";
import { 
  Container, Card, CardContent, Typography, 
  CircularProgress, Alert, Button, Modal, Box, TextField, Stack ,Snackbar
} from "@mui/material";
import axios from "../utils/headers"; // Your axios instance

const ProjectPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [adding, setAdding] = useState(false); // To handle button loading state
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    // ✅ Fetch Projects on Component Mount
    useEffect(() => {
      axios.get("/projects/list/")
        .then((response) => {
          setProjects(response.data); // Store projects in state
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
          setError("Failed to load projects"); // Set error message
          setLoading(false);
        });
    }, []);
    
    // ✅ Function to Handle Adding a New Project
    const handleAddProject = () => {
      if (!newProjectName.trim()) {
        setSnackbar({ open: true, message: "Project name cannot be empty", severity: "warning" });
        return; // Prevent empty submissions
      }
    
      setAdding(true); // Show button loading state
    
      axios.post("/projects/create/", { name: newProjectName })
        .then((response) => {
          setSnackbar({ open: true, message: "Project Added Successfully", severity: "success" });
    
          // ✅ Append new project to state without mutating the original array
          setProjects((prevProjects) => [...prevProjects, response.data]);
    
          setNewProjectName(""); // Clear input field
          setModalOpen(false); // Close modal
        })
        .catch((error) => {
          console.error("Error adding project:", error);
          setSnackbar({ open: true, message: "Failed to add project", severity: "error" });
        })
        .finally(() => setAdding(false)); // Remove button loading state
    };
    
    // ✅ Display loading state
    if (loading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
    
    // ✅ Display error message if fetching fails
    if (error) return <Alert severity="error">{error}</Alert>;
    

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center", my: 3 }}>Projects</Typography>

      {/* Add Project Button */}
      {userData?.role === "admin" && (
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => setModalOpen(true)} 
                sx={{ mb: 3 }}
            >
                Add New Project
            </Button>
        )}

      {/* Projects List (Using Flexbox) */}
      <Stack 
        spacing={2} 
        sx={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: 2 
        }}
        >
        {projects.map((project) => (
            <Card 
            key={project.id} 
            sx={{ cursor: "pointer" }}
            >
            <CardContent>
                <Typography variant="h6">{project.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                Created: {new Date(project.created_at).toLocaleDateString()}
                </Typography>
            </CardContent>
            </Card>
        ))}
        </Stack>

      {/* Add Project Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          bgcolor: "white", p: 3, borderRadius: 2, width: 400, boxShadow: 24
        }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Add New Project</Typography>
          <TextField 
            label="Project Name" 
            fullWidth 
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleAddProject} disabled={adding}>
            {adding ? "Adding..." : "Add Project"}
          </Button>
        </Box>
      </Modal>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default ProjectPage;
