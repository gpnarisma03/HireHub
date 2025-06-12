import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Banner from "../components/Banner";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState([]);

  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    middle_initial: "",
    last_name: "",
    email: "",
    mobile_number: "",
    password: "",
    confirm_password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess("");

    if (formData.password !== formData.confirm_password) {
      setErrors(["Passwords do not match."]);

      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/users", {
        ...formData,
        role,
      });

      if (response.status === 201 || response.status === 200) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      const errorData = err.response?.data;

      const backendErrors = errorData?.errors;
      if (backendErrors) {
        const messages = Object.values(backendErrors).flat(); // array, good
        setErrors(messages);
      } else {
        const fallback =
          errorData?.message || "Registration failed. Please try again.";
        setErrors([fallback]);
      }
    }
  };

  return (
    <>
      <Banner
        title="Start Your Career Journey Today"
        tagline="Create an account and unlock new opportunities."
        showButtons={false}
        sectionClassName="custom-banner"
      />

      <section className="register-section p-5" data-aos="fade-down">
        <div className="container">
          <div className="form-container mx-auto col-md-6 col-lg-5 p-4 p-md-5 card border-0">
            <h3 className="text-center mb-4">HireHub Register</h3>
            <hr />
            {errors.length > 0 && (
              <ul className="text-danger text-center">
                {errors.map((msg, idx) => (
                  <li key={idx}>{msg}</li>
                ))}
              </ul>
            )}
            {success && <p className="text-success text-center">{success}</p>}

            <form onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="mb-3 input-group">
                <span className="input-group-text bg-white border-0">
                  <i className="bi bi-person text-muted"></i>
                </span>
                <input
                  type="text"
                  name="first_name"
                  className="form-control border-0"
                  placeholder="First Name"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                />
              </div>

              {/* Middle Initial (Optional) */}
              <div className="mb-3 input-group">
                <span className="input-group-text bg-white border-0">
                  <i className="bi bi-person text-muted"></i>
                </span>
                <input
                  type="text"
                  name="middle_initial"
                  className="form-control border-0"
                  placeholder="Middle Initial (Optional)"
                  value={formData.middle_initial}
                  onChange={handleChange}
                  maxLength="1"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                />
              </div>

              {/* Last Name */}
              <div className="mb-3 input-group">
                <span className="input-group-text bg-white border-0">
                  <i className="bi bi-person text-muted"></i>
                </span>
                <input
                  type="text"
                  name="last_name"
                  className="form-control border-0"
                  placeholder="Last Name"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                />
              </div>

              {/* Email */}
              <div className="mb-3 input-group">
                <span className="input-group-text bg-white border-0">
                  <i className="bi bi-envelope text-muted"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control border-0"
                  placeholder="Email address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                />
              </div>

              {/* Mobile Number */}
              <div className="mb-3 input-group">
                <span className="input-group-text bg-white border-0">
                  <i className="bi bi-telephone text-muted"></i>
                </span>
                <input
                  type="text"
                  name="mobile_number"
                  className="form-control border-0"
                  placeholder="Mobile Number"
                  required
                  value={formData.mobile_number}
                  onChange={handleChange}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                />
              </div>

              {/* Role Dropdown */}
              <div className="mb-3">
                <select
                  className="form-select custom-select-style"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Are you an?
                  </option>
                  <option value="employee">Employee</option>
                  <option value="employer">Employer</option>
                </select>
              </div>

              {/* Password */}
              <div className="mb-3 input-group">
                <span className="input-group-text bg-white border-0">
                  <i className="bi bi-lock text-muted"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control border-0"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary border-0 bg-white"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <i
                    className={`bi showpass-button ${
                      showPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </button>
              </div>

              {/* Confirm Password */}
              <div className="mb-3 input-group">
                <span className="input-group-text bg-white border-0">
                  <i className="bi bi-lock text-muted"></i>
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  className="form-control border-0"
                  placeholder="Confirm Password"
                  required
                  value={formData.confirm_password}
                  onChange={handleChange}
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary border-0 bg-white"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <i
                    className={`bi showpass-button ${
                      showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </button>
              </div>

              {/* Submit Button */}
              <div className="d-grid">
                <button type="submit" className="register-btn text-center">
                  <i className="bi bi-box-arrow-in-right me-1"></i> Register
                </button>
              </div>
            </form>

            {/* Login Prompt */}
            <div className="text-center mt-3">
              <small className="account-text">
                Already have an account?{" "}
                <Link to="/login" className="fw-semibold text-decoration-none">
                  Login
                </Link>
              </small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
