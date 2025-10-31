import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  Bell,
  AlignJustify,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import "./styles/navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginClick = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setMobileOpen(false);
    navigate("/");
  };

  const handleChange = (e) => {
    const route = e.target.value;
    if (route) {
      setMobileOpen(false);
      navigate(route);
    }
  };

  const toggleMobileMenu = () => {
    setMobileOpen((s) => !s);
  };

  // Close mobile dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(ev.target)
      ) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <AlignJustify size={24} />
        </button>

        <span className="navbar-brand fw-bold fs-3 d-flex align-items-center text-white">
          <i className="bi bi-mortarboard-fill me-2 text-white"></i> LearnDesk
        </span>
      </div>

      <div className="navbar-right">
        <select
          className="form-select form-select-sm me-2 desktop-only"
          onChange={handleChange}
          defaultValue=""
        >
          <option value="" disabled>
            Practice
          </option>
          <option value="/user/ArithmeticAptitude">Arithmetic Aptitude</option>
          <option value="/user/LogicalReasoning">Logical Reasoning</option>
          <option value="/user/VerbalAbility">Verbal Ability</option>
          <option value="/user/NonVerbalReasoning">Non-Verbal Reasoning</option>
        </select>

        <button className="icon-button desktop-only" onClick={handleLoginClick}>
          <LogOut size={20} />
          <span className="btn-text">LogOut</span>
        </button>

        <button className="icon-button desktop-only">
          <Bell size={20} />
          <span className="notification-badge">5</span>
        </button>

        <div className="navbar-avatar desktop-only">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        {/* Mobile menu button (shown only on small screens) */}
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="mobile-dropdown" ref={mobileMenuRef}>
          {/* Search inside mobile menu */}
          <div className="mobile-search">
            <Search className="search-icon" size={18} />
            <input
              className="search-input-mobile"
              placeholder="Search..."
              type="text"
            />
          </div>

          {/* Practice select */}
          <select
            className="form-select form-select-sm mobile-select"
            onChange={handleChange}
            defaultValue=""
          >
            <option value="" disabled>
              Practice
            </option>
            <option value="/user/ArithmeticAptitude">Arithmetic Aptitude</option>
            <option value="/user/LogicalReasoning">Logical Reasoning</option>
            <option value="/user/VerbalAbility">Verbal Ability</option>
            <option value="/user/NonVerbalReasoning">Non-Verbal Reasoning</option>
          </select>

          {/* Actions */}
          <div className="mobile-actions">
            <button className="mobile-action" onClick={handleLoginClick}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>

            <button className="mobile-action">
              <Bell size={16} />
              <span>Notifications</span>
              <span className="mobile-noti-badge">5</span>
            </button>
          </div>

          <div className="mobile-avatar-row">
            <div className="mobile-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="mobile-username">
              {user?.name ? user.name : "User"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
