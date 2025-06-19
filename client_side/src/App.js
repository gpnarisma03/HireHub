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
import MyProfile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import JobListings from "./components/JobListings";

import EmployerPanel from "./pages/EmployerPanel";
import ManageCompany from "./pages/ManageCompany";
import JobApplicants from "./pages/JobApplicants";

import VerifyEmail from "./pages/VerifyEmail";

function App() {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const requireAuth = (element, allowedRoles = []) => {
    if (!user) return <Navigate to="/login" replace />;
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
    return element;
  };

  const redirectIfAuth = (element) =>
    user ? <Navigate to="/" replace /> : element;

  return (
    <main className="container">
      <NavigationBar />

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={redirectIfAuth(<Login />)} />
          <Route path="/register" element={redirectIfAuth(<Register />)} />
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobDetails/:jobSlug" element={<JobDetails />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={requireAuth(<Dashboard />, ["admin"])}
          />
          <Route
            path="/employer"
            element={requireAuth(<EmployerPanel />, ["employer"])}
          />
          <Route
            path="/employer/company/:company_id"
            element={requireAuth(<ManageCompany />, ["employer"])}
          />
          <Route
            path="/employee"
            element={requireAuth(<MyProfile />, ["employee"])}
          />
          <Route
            path="/employer/job/:job_id/applicants"
            element={requireAuth(<JobApplicants />)}
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />

          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      )}

      <Footer />
    </main>
  );
}

export default App;
