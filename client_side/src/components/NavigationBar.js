import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { Collapse } from "bootstrap";

function NavigationBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const navbarCollapseRef = useRef(null);

  // Collapse navbar on nav link click
  const handleNavLinkClick = () => {
    const collapseEl = navbarCollapseRef.current;
    if (collapseEl && collapseEl.classList.contains("show")) {
      const bsCollapse = new Collapse(collapseEl, { toggle: false });
      bsCollapse.hide();
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleNavLinkClick(); // collapse on logout too
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <nav
        className="navbar navbar-expand-lg pt-0 pb-0"
        style={{ height: "65px" }}
      >
        <Link className="navbar-brand" to="/" onClick={handleNavLinkClick}>
          HireHub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => {
            const bsCollapse = new Collapse(navbarCollapseRef.current);
            bsCollapse.toggle();
          }}
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          ref={navbarCollapseRef}
          className="collapse navbar-collapse justify-content-between align-items-center"
          id="navbarContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                to="/"
                onClick={handleNavLinkClick}
              >
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
                onClick={handleNavLinkClick}
              >
                ABOUT
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/jobs"
                onClick={handleNavLinkClick}
              >
                JOBS
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                onClick={handleNavLinkClick}
              >
                CONTACT
              </Link>
            </li>
          </ul>

          {!user ? (
            <ul className="navbar-nav mb-2 login-register">
              <li className="nav-item">
                <Link
                  className="nav-link nav-login"
                  to="/login"
                  onClick={handleNavLinkClick}
                >
                  LOGIN <i className="bi bi-box-arrow-in-right"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link nav-register"
                  to="/register"
                  onClick={handleNavLinkClick}
                >
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

          {(!user || user.role === "employer") && (
            <Link
              to="/postJobs"
              className="post-a-job d-none d-lg-flex align-items-center justify-content-center"
              onClick={handleNavLinkClick}
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
