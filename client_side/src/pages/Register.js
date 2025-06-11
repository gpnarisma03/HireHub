import React, { useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle registration logic
  };
  return (
    <>
      <Banner
        title="Start Your Career Journey Today"
        tagline="Create an account and unlock new opportunities."
        showButtons={false}
        sectionClassName="custom-banner"
      />

      <section className="register-section py-5" data-aos="fade-down">
        <div className="container">
          <div className="row justify-content-center">
            <div className="form-container col-md-6 col-lg-5 p-5">
              <div className="card border-0 p-4">
                <h3 className="text-center mb-4">HireHub Register</h3>
                <hr />
                <form onSubmit={handleSubmit}>
                  {/* First Name */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text bg-white border-0">
                        <i className="bi bi-person text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="First Name"
                        required
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text bg-white border-0">
                        <i className="bi bi-person text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Last Name"
                        required
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text bg-white border-0">
                        <i className="bi bi-envelope text-muted"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control border-0"
                        placeholder="Email address"
                        required
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text bg-white border-0">
                        <i className="bi bi-telephone text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Mobile Number"
                        required
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text bg-white border-0">
                        <i className="bi bi-lock text-muted"></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control border-0"
                        placeholder="Password"
                        required
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
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text bg-white border-0">
                        <i className="bi bi-lock text-muted"></i>
                      </span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control border-0"
                        placeholder="Confirm Password"
                        required
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
                  </div>
                  {/* Submit Button */}
                  <div className="d-grid">
                    <button type="submit" className="register-btn text-center">
                      <i className="bi bi-box-arrow-in-right me-1"></i>
                      Register
                    </button>
                  </div>
                </form>
              </div>

              {/* Login Prompt */}
              <div className="text-center mt-3">
                <small className="text-muted">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary fw-semibold text-decoration-none"
                  >
                    Login
                  </Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
