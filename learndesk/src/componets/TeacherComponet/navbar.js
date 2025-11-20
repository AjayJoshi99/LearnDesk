import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/navbar.css";
import { Menu, X, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Close on outside click
  useEffect(() => {
    const closeMenu = (e) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, [mobileOpen]);

  return (
    <nav className="navbar navbar-dark custom-navbar px-3 py-2 shadow-sm">
      <div className="d-flex justify-content-between align-items-center w-100">

        {/* Brand */}
        <span className="navbar-brand fw-bold fs-3 d-flex align-items-center">
          <i className="bi bi-mortarboard-fill me-2"></i> LearnDesk
        </span>

        {/* Desktop Navigation */}
        <div className="d-none d-lg-flex align-items-center gap-4">

          <NavLink to="/teacher/dashboard" className="nav-link text-white">
            <i className="bi bi-house-door me-1"></i> Home
          </NavLink>

          <NavLink to="/teacher/exam" className="nav-link text-white">
            <i className="bi bi-pencil-square me-1"></i> Exam
          </NavLink>

          <NavLink to="/teacher/performance" className="nav-link text-white">
            <i className="bi bi-bar-chart-line me-1"></i> Performance
          </NavLink>

          <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-1"></i> Logout
          </button>

          {user && (
            <div
              className="profile-circle position-relative"
              onMouseEnter={() => setShowProfile(true)}
              onMouseLeave={() => setShowProfile(false)}
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

        {/* Mobile Menu Toggle */}
        <button
          className="d-lg-none border-0 bg-transparent text-white"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="mobile-dropdown" ref={mobileRef}>
          <NavLink
            to="/teacher/dashboard"
            className="mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/teacher/exam"
            className="mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            Exam
          </NavLink>

          <NavLink
            to="/teacher/performance"
            className="mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            Performance
          </NavLink>

          <button className="mobile-btn" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>

          {user && (
            <div className="mobile-avatar-row">
              <div className="mobile-avatar">{user.name.charAt(0)}</div>
              <div className="mobile-user">
                <p className="fw-semibold m-0">{user.name}</p>
                <p className="text-muted small m-0">{user.email}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
