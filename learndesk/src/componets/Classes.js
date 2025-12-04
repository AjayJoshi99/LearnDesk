import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentDashboard = () => {
  const [classCode, setClassCode] = useState("");
  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState(null);
  const userData = localStorage.getItem("user");
  const studentEmail = userData ? JSON.parse(userData).email : "";
  const navigate = useNavigate();

  const handleViewClass = (cls) => {
    localStorage.setItem("currentClass", JSON.stringify(cls));
    navigate(`/user/class/${cls.code}`);
  };

  // Fetch classes for this student
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/class/student/${studentEmail}`);
        const data = await res.json();
        if (res.ok) setClasses(data.classes || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClasses();
  }, [studentEmail]);

  // Join new class
  const handleJoinClass = async () => {
    if (!classCode.trim()) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/class/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classCode: classCode.trim(), email: studentEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: data.message });
        setClasses((prev) => [...prev, data.class]);
        setClassCode("");
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error joining class" });
    }
  };

  return (
    <div className="container mt-4">
      {/* Join class section */}
      <div className="create-class-card shadow-sm rounded-4 p-4 mb-4">
    <h5 className="fw-semibold mb-3">
      <i className="bi bi-box-arrow-in-right me-2 text-primary"></i>
      Join a Class
    </h5>

    <div className="d-flex flex-column flex-md-row gap-3">
        <input
          type="text"
          className="form-control rounded-pill px-3"
          placeholder="Enter Class Code"
          value={classCode}
          onChange={(e) => setClassCode(e.target.value)}
        />
        <button
          className="btn btn-primary rounded-pill px-4"
          onClick={handleJoinClass}
        >
          Join
        </button>
      </div>
      </div>
      <h4 className="fw-bold text-primary mb-3">My Classes</h4>
      {/* Alerts */}
      {message && (
        <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} fade show`}>
          {message.text}
          <button className="btn-close" onClick={() => setMessage(null)}></button>
        </div>
      )}

      {/* Class cards */}
      <div className="row g-3">
        {classes.length > 0 ? (
          classes.map((cls, idx) => (
            <div key={idx} className="col-md-6 col-lg-4">
              <div className="card shadow-sm p-3 rounded-4">
                <h5 className="fw-semibold text-primary mb-2">{cls.className}</h5>

                    <p className="mb-1">
                      <span className="fw-bold text-dark">Subject:</span> {cls.subject}
                    </p>

                    <p className="mb-1">
                      <span className="fw-bold text-dark">Teacher:</span> {cls.teacherName}
                    </p>

                    <p className="mb-2">
                      <span className="fw-bold text-dark">Email:</span> {cls.teacherEmail}
                    </p>

                  <button
                    className="btn btn-primary mt-3 w-100 rounded-pill"
                    onClick={() => handleViewClass(cls)}
                    >
                    View Class
                    </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">You haven't joined any classes yet.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
