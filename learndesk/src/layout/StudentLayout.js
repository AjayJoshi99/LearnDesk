import Sidebar from "../componets/sidebar";
import Navbar from "../componets/navbar";
import { useState } from "react";
import "../componets/styles/studentLayout.css";
import { Outlet } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <button className="floating-toggle-btn" onClick={toggleSidebar}>
         {isSidebarOpen ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
      </button>
    </div>
  );
}
