import Sidebar from "../componets/sidebar";
import Navbar from "../componets/navbar";
import { useState } from "react";
import "../componets/styles/studentLayout.css";
import { Outlet } from "react-router-dom";

export default function StudentLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
  return (
        <div className="student-layout">
        <Sidebar isOpen={isSidebarOpen} />

        <div className="right-section">
            <Navbar toggleSidebar={toggleSidebar} />
            <main className="main-content"> <Outlet /></main>
        </div>
        </div>
  );
}
