import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./pages/_partials/Navbar";
import Tasks from "./pages/Tasks";
import Features from "./pages/_partials/Features";
import CTA from "./pages/_partials/CTA";
import Footer from "./pages/_partials/Footer";
import Hero from "./pages/_partials/Hero";
import Testimonials from "./pages/_partials/Testimonials";
import SocialMedia from "./pages/_partials/SocialMedia";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userData");
    setIsAuthenticated(!!user);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Router>
        <Navbar setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
          <Route path="/" element={<><Hero /><Features /><Testimonials /><CTA /><SocialMedia /></>} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/tasks" /> : <Login  setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/tasks" /> : <Register  setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/tasks" element={isAuthenticated ? <Tasks /> : <Navigate to="/login" />} />
          <Route path="/projects" element={<Projects />} />

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;