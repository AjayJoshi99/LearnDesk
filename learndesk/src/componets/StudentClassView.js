import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bell, FileText, BarChart3, GraduationCap  } from "lucide-react";

const StudentClassView = () => {
  const { code } = useParams();
  const [activeTab, setActiveTab] = useState("announcements");
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    // Load class from localStorage
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
          <div className="card shadow-lg p-4 rounded-4 mb-4 border-0">
            <div className="d-flex align-items-center gap-3">
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

          {/* Tabs */}
          <div className="d-flex justify-content-around mb-3 border-bottom pb-2">
            <div
              className={`text-center ${activeTab === "announcements" ? "text-primary fw-bold" : "text-muted"}`}
              style={{ cursor: "pointer" }}
              onClick={() => setActiveTab("announcements")}
            >
              <Bell size={20} className="me-1" /> Announcements
            </div>

            <div
              className={`text-center ${activeTab === "exams" ? "text-primary fw-bold" : "text-muted"}`}
              style={{ cursor: "pointer" }}
              onClick={() => setActiveTab("exams")}
            >
              <FileText size={20} className="me-1" /> Exams
            </div>

            <div
              className={`text-center ${activeTab === "performance" ? "text-primary fw-bold" : "text-muted"}`}
              style={{ cursor: "pointer" }}
              onClick={() => setActiveTab("performance")}
            >
              <BarChart3 size={20} className="me-1" /> Performance
            </div>
          </div>

          {/* Tab Content */}
          <div className="card shadow-sm p-4 rounded-4">
            {activeTab === "announcements" && <p>No announcements yet!</p>}
            {activeTab === "exams" && <p>No exams yet!</p>}
            {activeTab === "performance" && <p>No performance data yet!</p>}
          </div>
        </>
      ) : (
        <div className="text-center mt-5 text-muted">
          <h5>⚠️ Class details not found</h5>
          <p>Try navigating from your dashboard again.</p>
        </div>
      )}
    </div>
  );
};

export default StudentClassView;
