import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bell, FileText, BarChart3, GraduationCap, File } from "lucide-react";
import Announcement from "./Announcement";
import StudentExamTab from "./StudentExamTab";
import PerformanceStats from "./PerformanceStats";
import FileDownload from "./FileDownload"; 
const StudentClassView = () => {
  const { code } = useParams();
  const [activeTab, setActiveTab] = useState("announcements");
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    localStorage.setItem("currentClassCode", code);
  }, [code]);

  useEffect(() => {
    const storedClass = localStorage.getItem("currentClass");
    if (storedClass) {
      setClassData(JSON.parse(storedClass));
    } else {
      console.warn("No class found in localStorage");
    }
    
  }, [code]);

  return (
    <div className="container py-4">
      {classData ? (
        <>
          {/* ---- Class Header ---- */}
          <div className="card shadow-lg p-4 rounded-4 mb-4 border-0 animate-fade-in">
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <div className="bg-primary bg-opacity-10 p-3 rounded-circle shadow-sm">
                <GraduationCap size={40} className="text-primary" />
              </div>
              <div>
                <h4 className="fw-bold text-primary mb-1">{classData.className}</h4>
                <p className="text-muted mb-0 fs-6">{classData.subject}</p>
                <small className="text-secondary">Class Code: {classData.code}</small>
              </div>
            </div>
          </div>

          {/* ---- Tabs ---- */}
          <div className="d-flex justify-content-around mb-3 border-bottom pb-2 flex-wrap text-center">
            <div
              className={`tab-item ${activeTab === "announcements" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("announcements")}
            >
              <Bell size={18} className="me-1" /> Announcements
            </div>

            <div
              className={`tab-item ${activeTab === "exams" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("exams")}
            >
              <FileText size={18} className="me-1" /> Exams
            </div>

            <div
              className={`tab-item ${activeTab === "performance" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("performance")}
            >
              <BarChart3 size={18} className="me-1" /> Performance
            </div>

            <div
              className={`tab-item ${activeTab === "files" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("files")}
            >
              <File size={18} className="me-1" /> Files
            </div>
          </div>

          <div className="card shadow-sm p-4 rounded-4 animate-fade-in">
            {activeTab === "announcements" && <Announcement classCode={classData.code} />}
            {activeTab === "exams" && <StudentExamTab />}
            {activeTab === "performance" && <PerformanceStats />}
            {activeTab === "files" && <FileDownload />}
          </div>
        </>
      ) : (
        <div className="text-center mt-5 text-muted">
          <h5>⚠️ Class details not found</h5>
          <p>Try navigating from your dashboard again.</p>
        </div>
      )}

      <style>{`
        .tab-item {
          cursor: pointer;
          color: #6c757d;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        .tab-item:hover {
          background-color: rgba(13, 110, 253, 0.1);
          color: #0d6efd;
        }
        .active-tab {
          color: #0d6efd !important;
          font-weight: 600;
          border-bottom: 2px solid #0d6efd;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default StudentClassView;
