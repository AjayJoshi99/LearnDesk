import { Search, Bell, Mail, Menu } from "lucide-react";
import "./styles/navbar.css";

const Navbar = ({ toggleSidebar }) => {

  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
        </div>
      </div>
      <div className="navbar-right">
        <button className="icon-button">
          <Mail size={20} />
          <span className="notification-badge">3</span>
        </button>
        <button className="icon-button">
          <Bell size={20} />
          <span className="notification-badge">5</span>
        </button>
        <div className="navbar-avatar">JD</div>
      </div>
    </div>
  );
};

export default Navbar;
