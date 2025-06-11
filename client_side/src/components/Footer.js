import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer pt-4 bg-light text-dark">
      <div className="container p-5">
        <div className="row">
          {/* 1st Column: Company */}
          <div className="col-md-4 mb-4">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="about">› About Us</Link>
              </li>
              <li>
                <Link to="contact">› Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* 2nd Column: Quicklinks */}
          <div className="col-md-4 mb-4">
            <h5>Quicklinks</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/">› Home</Link>
              </li>
              <li>
                <Link to="https://gpnarisma03.github.io/my-portfolio/">
                  › Projects
                </Link>
              </li>
              <li>
                <Link to="https://gpnarisma03.github.io/my-portfolio/">
                  › Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* 3rd Column: Contact */}
          <div className="col-md-4 mb-4">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>
                <i className="bi bi-geo-alt-fill me-2"></i>Fairview, Quezon City
              </li>
              <li>
                <i className="bi bi-telephone-fill me-2"></i>+63 912 345 6789
              </li>
              <li>
                <i className="bi bi-envelope-fill me-2"></i>
                geraldpnarisma@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <hr />

        <div className="text-center pt-2">
          <small>
            &copy; {new Date().getFullYear()} HireHub. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
