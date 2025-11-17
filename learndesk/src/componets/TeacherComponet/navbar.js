import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleProfileDropdown = () => {
    setShowProfile((prev) => !prev);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar px-3 py-2 shadow-sm">
      <div className="container">
        <span className="navbar-brand fw-bold fs-3 d-flex align-items-center">
          <i className="bi bi-mortarboard-fill me-2 "></i> LearnDesk
        </span>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list text-white fs-2"></i>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarContent"
        >

          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3 text-center">
            <li className="nav-item">
              <NavLink to="/teacher/dashboard" className="nav-link py-2">
                <i className="bi bi-house-door me-1"></i> Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/teacher/exam" className="nav-link py-2">
                <i className="bi bi-pencil-square me-1"></i> Exam
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/teacher/performance" className="nav-link py-2">
                <i className="bi bi-bar-chart-line me-1"></i> Performance
              </NavLink>
            </li>
          </ul>

          <div className="d-flex flex-column flex-lg-row align-items-center gap-3 mt-3 mt-lg-0">
            <button
              className="btn btn-sm btn-outline-light w-100 w-lg-auto"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>

            {user && (
              <div
                className="profile-circle position-relative"
                onMouseEnter={() => window.innerWidth > 991 && setShowProfile(true)}
                onMouseLeave={() => window.innerWidth > 991 && setShowProfile(false)}
                onClick={toggleProfileDropdown} 
              >
                <div className="circle text-uppercase">{user.name.charAt(0)}</div>

                {showProfile && (
                  <div className="profile-dropdown shadow-lg">
                    <p className="mb-1 fw-semibold">{user.name}</p>
                    <p className="mb-2 text-muted small">{user.email}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
