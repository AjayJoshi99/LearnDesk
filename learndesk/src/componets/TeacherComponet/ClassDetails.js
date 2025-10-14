import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/ClassDetails.css";
import StudentsTab from "./StudentsTab";
import ExamsTab from "./ExamsTab";
import ResultsTab from "./ResultsTab";
import AnnouncementsTab from "./AnnouncementsTab";
import SettingsTab from "./SettingsTab";

const ClassDetails = () => {
  const { id } = useParams(); 
  const [activeTab, setActiveTab] = useState("students");
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`);
        const data = await res.json();
        if (res.ok) {
          setClassData(data);
        } else {
          console.error("Failed to fetch class details:", data.message);
        }
      } catch (error) {
        console.error("Error fetching class details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClassDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-muted">Loading class details...</p>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="text-center mt-5 text-danger">
        <i className="bi bi-exclamation-triangle-fill fs-1"></i>
        <p className="mt-3">Class not found.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4 class-details-page">
      {/* Header */}
      <div className="class-header shadow-sm p-4 rounded-4 mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
          <div>
            <h3 className="fw-bold mb-1 text-primary">{classData.className}</h3>
             <h6 className="fw-bold mb-1 text-primary">Subject : {classData.subject}</h6>
            <p className="text-muted mb-0">
              <i className="bi bi-hash me-2"></i>Class Code:{" "}
              <strong>{classData.code}</strong>
            </p>
            <small className="text-secondary">
              Created on: {new Date(classData.createdAt).toDateString()}
            </small>
          </div>
          <div className="mt-3 mt-md-0">
            <button
              className="btn btn-outline-primary rounded-pill px-4"
              onClick={() =>
                navigator.clipboard
                  .writeText(classData.code)
                  .then(() => alert("Class code copied to clipboard!"))
              }
            >
              Share Code
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3 justify-content-center">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            <i className="bi bi-people-fill me-1"></i>Students
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "exams" ? "active" : ""}`}
            onClick={() => setActiveTab("exams")}
          >
            <i className="bi bi-pencil-square me-1"></i>Exams
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "results" ? "active" : ""}`}
            onClick={() => setActiveTab("results")}
          >
            <i className="bi bi-bar-chart-line me-1"></i>Results
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "announcements" ? "active" : ""}`}
            onClick={() => setActiveTab("announcements")}
          >
            <i className="bi bi-megaphone me-1"></i>Announcements
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <i className="bi bi-gear me-1"></i>Settings
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content p-4 bg-white rounded-4 shadow-sm">
        {activeTab === "students" && <StudentsTab classId={id} />}
        {activeTab === "exams" && <ExamsTab classId={id} />}
        {activeTab === "results" && <ResultsTab classId={id} />}
        {activeTab === "announcements" && <AnnouncementsTab classCode={id} />}
        {activeTab === "settings" && <SettingsTab classId={id} />}
      </div>
    </div>
  );
};

export default ClassDetails;
