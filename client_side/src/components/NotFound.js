import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="text-center py-5">
      <h1 className="display-4 text-danger">404</h1>
      <p className="lead">Oops! Page not found.</p>
      <Link to="/" className="btn btn-primary mt-3">
        <i className="bi bi-house-door-fill me-1"></i> Go Back Home
      </Link>
    </section>
  );
}

export default NotFound;
