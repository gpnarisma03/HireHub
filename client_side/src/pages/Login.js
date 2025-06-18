import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // clear previous error

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/login`,
        { email, password }
      );

      localStorage.setItem("token", res.data.access_token);
      login(res.data.access_token);
      navigate("/");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid credentials or server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Banner
        title="Your Career Journey Continues Here."
        tagline="Login to connect with opportunity."
        showButtons={false}
        sectionClassName="custom-banner"
      />
      <section className="login-section p-5" data-aos="fade-down">
        <div className="container">
          <div className="form-container mx-auto col-md-6 col-lg-5 p-4 p-md-5 card border-0">
            <h3 className="text-center mb-4">HireHub Login</h3>
            <hr />
            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="mb-3 input-group">
                <span className="input-group-text bg-white border-0">
                  <i className="bi bi-envelope text-muted"></i>
                </span>
                <input
                  type="email"
                  className="form-control border-0"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                />
              </div>

              {/* Password */}
              <div className="mb-3 input-group">
                <span className="input-group-text bg-white border-0">
                  <i className="bi bi-lock text-muted"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control border-0"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary border-0 bg-white"
                  onClick={togglePassword}
                >
                  <i
                    className={`bi showpass-button ${
                      showPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger text-center py-2">
                  {error}
                </div>
              )}

              {/* Submit */}
              <div className="d-grid">
                <button
                  type="submit"
                  className="login-btn text-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-1"></i>
                      Login
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Register Prompt */}
            <div className="text-center mt-3">
              <small className="account-text">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="fw-semibold text-decoration-none"
                >
                  Register
                </Link>
              </small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
