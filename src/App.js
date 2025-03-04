import Navbar from "./pages/_partials/Navbar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Features from "./pages/_partials/Features";
import CTA from "./pages/_partials/CTA";
import Footer from "./pages/_partials/Footer";
import Hero from "./pages/_partials/Hero";
import Testimonials from "./pages/_partials/Testimonials";
import SocialMedia from "./pages/_partials/SocialMedia";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Features />
                <Testimonials />
                <CTA />
                <SocialMedia />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
