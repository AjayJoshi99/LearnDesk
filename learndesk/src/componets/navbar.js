import { Search, Bell,  AlignJustify , LogOut  } from "lucide-react";
import "./styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleLoginClick = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/"); 
  };

  const handleChange = (e) => {
    const route = e.target.value;
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <AlignJustify size={24} />
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
        <select
          className="form-select form-select-sm me-2"
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
        <button className="icon-button" onClick={handleLoginClick}>
          <LogOut size={20} />
          LogOut
        </button>
        <button className="icon-button">
          <Bell size={20} />
          <span className="notification-badge">5</span>
        </button>
        <div className="navbar-avatar">{user?.name ? user.name.charAt(0).toUpperCase() : "U"}</div>
      </div>
    </div>
  );
};

export default Navbar;
