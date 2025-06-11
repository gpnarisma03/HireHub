import React, { useState, useContext } from "react";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import { AuthContext } from "../context/AuthContext"; // import AuthContext

const notyf = new Notyf();

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext); // get login from context

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.access_token);
      login(res.data.access_token);
      notyf.success("Login Successful");
      navigate("/");
    } catch (err) {
      setError("Invalid credentials or validation failed.");
      if (err.response) {
        notyf.error(err.response.data.message || "Login failed");
      } else {
        console.log("Error:", err.message);
      }
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
      <section className="login-section py-5" data-aos="fade-down">
        <div className="container">
          <div className="row justify-content-center">
            <div className="form-container col-md-6 col-lg-5 p-5">
              <div className="card border-0 p-4">
                <h3 className="text-center mb-4">HireHub Login</h3>
                <hr />
                <form onSubmit={handleLogin}>
                  {/* Email */}
                  <div className="mb-3">
                    <div className="input-group">
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
                  </div>

                  {/* Submit */}
                  <div className="d-grid">
                    <button type="submit" className="login-btn text-center">
                      <i className="bi bi-box-arrow-in-right me-1"></i>
                      Login
                    </button>
                  </div>
                </form>
              </div>

              {/* Register Prompt */}
              <div className="text-center mt-3">
                <small className="text-muted">
                  Don’t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary fw-semibold text-decoration-none"
                  >
                    Register
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

export default Login;
