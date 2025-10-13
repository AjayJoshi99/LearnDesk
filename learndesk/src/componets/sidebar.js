import { Home, Users, Settings, BarChart3, FileText, Calendar } from "lucide-react";
import "./styles/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/user/dashboard" },
    { icon: BarChart3, label: "History", path: "/user/history" },
    { icon: Users, label: "Articles", path: "/user/articles" },
    { icon: FileText, label: "Classes", path: "/user/classes" },
    { icon: Calendar, label: "Dummy", path: "/user/dashboard" },
    { icon: Settings, label: "Dummy", path: "/user/dashboard" },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-logo">LearnDesk</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className={`sidebar-link ${isActive ? "active" : ""}`}
            >
              <item.icon className="sidebar-icon" size={20} />
              <span className="sidebar-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        {user ? (
          <div className="user-profile">
            <div className="user-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="user-info">
              <p className="user-name">{user.name}</p>
              <p className="user-email">{user.email}</p>
            </div>
          </div>
        ) : (
          <div className="user-profile">
            <div className="user-avatar">?</div>
            <div className="user-info">
              <p className="user-name">Guest</p>
              <p className="user-email">guest@example.com</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
