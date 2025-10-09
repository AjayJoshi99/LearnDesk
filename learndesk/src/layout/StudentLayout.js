import Sidebar from "../componets/sidebar";
import Navbar from "../componets/navbar";
import { useState } from "react";
import "../componets/styles/studentLayout.css";

export default function StudentLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
  return (
        <div className="student-layout">
        <Sidebar isOpen={isSidebarOpen} />

        <div className="right-section">
            <Navbar toggleSidebar={toggleSidebar} />
            <main className="main-content">{children}</main>
        </div>
        </div>
  );
}
