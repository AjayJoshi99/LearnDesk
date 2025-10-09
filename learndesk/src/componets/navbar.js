import { Search, Bell, Mail, Menu, LogOut  } from "lucide-react";
import "./styles/navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/"); 
  };

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
        <button className="icon-button" onClick={handleLoginClick}>
          <LogOut size={20} />
          LogOut
        </button>
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
