import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/Home.css";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Teacher" };
  const navigate = useNavigate();
  const [classes, setClasses] = useState([
    {
      id: "CLS101",
      name: "Computer Networks",
      code: "CN1234",
      createdAt: "2025-09-30",
      students: 25,
    },
    {
      id: "CLS102",
      name: "Operating Systems",
      code: "OS5678",
      createdAt: "2025-10-02",
      students: 18,
    },
    {
      id: "CLS103",
      name: "Database Management",
      code: "DB2468",
      createdAt: "2025-10-05",
      students: 30,
    },
  ]);

  const [newClassName, setNewClassName] = useState("");

  const handleCreateClass = () => {
    if (!newClassName.trim()) return;

    const newClass = {
      id: "CLS" + Math.floor(Math.random() * 1000),
      name: newClassName,
      code: "CD" + Math.floor(Math.random() * 10000),
      createdAt: new Date().toISOString().split("T")[0],
      students: 0,
    };

    setClasses([newClass, ...classes]);
    setNewClassName("");
  };

  return (
    <div className="container mt-4 home-page">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="fw-bold">Welcome back, {user.name}! 👋</h3>
        <p className="text-muted">Manage your classes and students with ease.</p>
      </div>

      {/* Create Class */}
      <div className="create-class-card shadow-sm rounded-4 p-4 mb-4">
        <h5 className="fw-semibold mb-3">
          <i className="bi bi-plus-circle me-2 text-primary"></i>
          Create New Class
        </h5>
        <div className="d-flex flex-column flex-md-row gap-3">
          <input
            type="text"
            placeholder="Enter class name"
            className="form-control rounded-pill px-3"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
          />
          <button
            className="btn btn-primary rounded-pill px-4"
            onClick={handleCreateClass}
          >
            Create
          </button>
        </div>
      </div>

      {/* Classes Section */}
      <h5 className="fw-semibold mb-3">Your Classes</h5>
      <div className="row g-4">
        {classes.map((cls) => (
          <div key={cls.id} className="col-md-4 col-sm-6 col-12">
            <div className="card class-card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h5 className="fw-bold text-primary mb-0">{cls.name}</h5>
                    <i className="bi bi-people-fill fs-5 text-secondary"></i>
                  </div>
                  <p className="mb-1 text-muted">
                    <i className="bi bi-hash me-2"></i>Code: {cls.code}
                  </p>
                  <p className="mb-1 text-muted">
                    <i className="bi bi-calendar-event me-2"></i>
                    Created: {new Date(cls.createdAt).toDateString()}
                  </p>
                  <p className="mb-2 text-muted">
                    <i className="bi bi-person-check me-2"></i>
                    Students: {cls.students}
                  </p>
                </div>
                <button
                    className="btn btn-outline-primary rounded-pill mt-3"
                    onClick={() => navigate(`/teacher/class/${cls.id}`)}
                    >
                    View Class
                    </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {classes.length === 0 && (
        <p className="text-center text-muted mt-4">No classes yet. Create one!</p>
      )}
    </div>
  );
};

export default Home;
