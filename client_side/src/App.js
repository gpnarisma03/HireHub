import React, { useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "./context/AuthContext";

import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import JobDetails from "./components/JobDetails";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import JobListings from "./components/JobListings";

function App() {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const requireAuth = (element) =>
    user ? element : <Navigate to="/login" replace />;
  const redirectIfAuth = (element) =>
    user ? <Navigate to="/" replace /> : element;

  return (
    <main className="container">
      <NavigationBar />

      {/* Show spinner only inside the Routes content */}
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={redirectIfAuth(<Login />)} />
          <Route path="/register" element={redirectIfAuth(<Register />)} />
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobDetails/:jobSlug" element={<JobDetails />} />

          {/* Protected */}
          <Route path="/profile" element={requireAuth(<Profile />)} />
          <Route path="/dashboard" element={requireAuth(<Dashboard />)} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      )}

      <Footer />
    </main>
  );
}

export default App;
