import React, { useEffect, useState, useRef } from "react";
import {
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
        <span className="navbar-brand fw-bold fs-3 d-flex align-items-center text-white">
          <i className="bi bi-mortarboard-fill me-2 mx-3 text-white"></i> LearnDesk
        </span>
      </div>

      <div className="navbar-right">
        <select
          className="form-select block w-full rounded-2xl border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
          onChange={handleChange}
          defaultValue=""
          >
          <option value="" disabled>Practice</option>
          <option value="/user/ArithmeticAptitude" className="btn-primary">Arithmetic Aptitude</option>
          <option value="/user/LogicalReasoning" className="btn-primary">Logical Reasoning</option>
          <option value="/user/VerbalAbility" className="btn-primary">Verbal Ability</option>
          <option value="/user/NonVerbalReasoning" className="btn-primary">Non-Verbal Reasoning</option>
          </select>

        <button className="icon-button desktop-only" onClick={handleLoginClick}>
          <LogOut size={20} />
          <span className="btn-text">LogOut</span>
        </button>

        <div className="navbar-avatar desktop-only">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-dropdown" ref={mobileMenuRef}>
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

          <div className="mobile-actions">
            <button className="mobile-action" onClick={handleLoginClick}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>

         <div
          className="mobile-avatar-row"
          title={user?.email || user?.name || "User"}
        >
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
