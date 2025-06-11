import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function NavigationBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // or "/" depending on your preference
  };

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg pt-0 pb-0"
        style={{ height: "65px" }}
      >
        <Link className="navbar-brand" to="/">
          HireHub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between align-items-center"
          id="navbarContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                ABOUT
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/jobs">
                JOBS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                CONTACT
              </Link>
            </li>
          </ul>

          {!user ? (
            <ul className="navbar-nav mb-2 login-register">
              <li className="nav-item">
                <Link className="nav-link nav-login" to="/login">
                  LOGIN <i className="bi bi-box-arrow-in-right"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-register" to="/register">
                  REGISTER <i className="bi bi-person-plus"></i>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav mb-2 align-items-center">
              <li className="nav-item navbar-text me-3">
                Welcome, {user.first_name}
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  LOGOUT <i className="bi bi-box-arrow-right me-2"></i>
                </button>
              </li>
            </ul>
          )}

          {/* Show "Post A Job" if no user logged in OR user.role is "employer" */}
          {(!user || user.role === "employer") && (
            <Link
              to="/postJobs"
              className="post-a-job d-none d-lg-flex align-items-center justify-content-center"
            >
              Post A Job <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavigationBar;
