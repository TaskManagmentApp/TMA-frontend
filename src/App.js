import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
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

// Auth Context
export const AuthContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<><Hero /><Features /><Testimonials /><CTA /><SocialMedia /></>} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/tasks" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={isAuthenticated ? <Tasks /> : <Navigate to="/login" />} />
        </Routes>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;