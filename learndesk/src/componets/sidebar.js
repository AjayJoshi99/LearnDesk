import { Home, Users, Settings, BarChart3, FileText, Calendar } from "lucide-react";
import "./styles/sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { icon: Home, label: "Dummy", active: true },
    { icon: BarChart3, label: "Dummy" },
    { icon: Users, label: "Dummy" },
    { icon: FileText, label: "Dummy" },
    { icon: Calendar, label: "Dummy" },
    { icon: Settings, label: "Dummy" },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-logo">MyApp</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <Link
              key={index}
              to={item.path}   // e.g. "/dashboard"
              className={`sidebar-link ${item.active ? "active" : ""}`}
            >
              <item.icon className="sidebar-icon" size={20} />
              <span className="sidebar-label">{item.label}</span>
            </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">JD</div>
          <div className="user-info">
            <p className="user-name">John Doe</p>
            <p className="user-email">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
