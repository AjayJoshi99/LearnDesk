import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/Home.css";

const TeacherHome = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Teacher" };
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/class/teacher/${user.email}`
        );
        const data = await res.json();
        setClasses(Array.isArray(data) ? data : data.classes || []);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }finally {
      setLoading(false);
    }
    };
    fetchClasses();
  }, [user.email]);

  const handleCreateClass = async () => {
    if (!newClassName.trim() || !subject.trim()) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/class/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          className: newClassName, 
          subject, 
          teacherEmail: user.email,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setClasses((prev) => [data.class, ...prev]);
        setNewClassName("");
        setSubject("");
      } else {
        console.error("Failed to create class:", data.message);
      }
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  return (
    <div className="container mt-4 home-page">
      <div className="text-center mb-4">
        <h3 className="fw-bold">Welcome back, {user.name}! 👋</h3>
        <p className="text-muted">Manage your classes and students with ease.</p>
      </div>

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
          <input
            type="text"
            placeholder="Enter subject"
            className="form-control rounded-pill px-3"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <button
            className="btn btn-primary rounded-pill px-4"
            onClick={handleCreateClass}
          >
            Create
          </button>
        </div>
      </div>

      <h5 className="fw-semibold mb-3">Your Classes</h5>

<div className="row g-4">
  {loading ? (
    <div className="text-center mt-4 w-100">
      <div className="spinner-border text-primary"></div>
      <p className="text-muted mt-2">Loading your classes...</p>
    </div>
  ) : classes.length > 0 ? (
    classes.map((cls) => (
      <div key={cls._id || cls.id} className="col-md-4 col-sm-6 col-12">
        <div className="card class-card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h5 className="fw-bold text-primary mb-0">
                  {cls.className}
                </h5>
                <i className="bi bi-people-fill fs-5 text-secondary"></i>
              </div>
              <p className="mb-1 text-muted">
                <i className="bi bi-book me-2"></i>
                Subject: {cls.subject || "N/A"}
              </p>
              <p className="mb-1 text-muted">
                <i className="bi bi-hash me-2"></i>
                Code: {cls.code || "N/A"}
              </p>
              <p className="mb-1 text-muted">
                <i className="bi bi-calendar-event me-2"></i>
                Created:{" "}
                {cls.createdAt
                  ? new Date(cls.createdAt).toDateString()
                  : "Unknown"}
              </p>
              <p className="mb-2 text-muted">
                <i className="bi bi-person-check me-2"></i>
                Students: {cls.students?.length || 0}
              </p>
            </div>
            <button
              className="btn btn-primary rounded-pill mt-3"
              onClick={() => {
                localStorage.setItem("currentClassCode", cls.code);
                window.location.href = `/teacher/class/${cls.code}`;
              }}
            >
              View Class
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-muted mt-4">
      No classes yet. Create one!
    </p>
  )}
</div>
    </div>
  );
};

export default TeacherHome;
