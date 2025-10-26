import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/StudentTab.css";

const StudentTab = () => {
  const classCode = localStorage.getItem("currentClassCode");
  const [students, setStudents] = useState([]);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
  if (!classCode) return;

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/class/${classCode}/students`
      );
      const data = await res.json();
      if (res.ok) {
        setStudents(data.students || []);
        setPendingStudents(data.pendingStudents || []);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error fetching students" });
    } finally {
      setLoading(false);
    }
  };

  fetchStudents();
}, [classCode]);


  const handleAddStudent = async () => {
    if (!newStudentEmail.trim()) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/class/${classCode}/add-student`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: newStudentEmail.trim() }),
        }
      );
      const data = await res.json();
      if (res.ok || data.message) {
        if (data.message.includes("pending")) {
          setPendingStudents((prev) => [...prev, newStudentEmail.trim()]);
        } else {
          setStudents((prev) => [...prev, newStudentEmail.trim()]);
        }
        setMessage({ type: "success", text: data.message });
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error adding student" });
    }
    setNewStudentEmail("");
  };

  const handleRemoveStudent = async (email) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/class/${classCode}/remove-student`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (res.ok || data.message) {
        setStudents((prev) => prev.filter((s) => s.email !== email));
        setMessage({ type: "success", text: data.message });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error removing student" });
    }
  };
  return (
    <div className="student-tab">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h5 className="fw-bold text-primary">
          <i className="bi bi-people-fill me-2"></i>Students
        </h5>
        <div className="d-flex gap-2 mt-2 mt-md-0">
          <input
            type="email"
            className="form-control rounded-pill px-3"
            placeholder="Enter student email"
            value={newStudentEmail}
            onChange={(e) => setNewStudentEmail(e.target.value)}
          />
          <button
            className="btn btn-primary rounded-pill px-4"
            onClick={handleAddStudent}
          >
            Add
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`alert ${
            message.type === "success" ? "alert-success" : "alert-danger"
          } alert-dismissible fade show`}
        >
          {message.text}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage(null)}
          ></button>
        </div>
      )}

      {loading && <p className="text-center text-muted">Loading students...</p>}

      {students.map((student, idx) => (
      <div key={idx} className="col-md-6 col-lg-4">
        <div className="card student-card shadow-sm rounded-4 p-3 m-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-semibold mb-1">{student.name}</h6>
              <small className="text-muted">{student.email}</small><br/>
              <small className="text-muted">Contact: {student.mobile}</small><br/>
              <small className="text-success">{student.status}</small>
            </div>
            <div>
          <div className="d-flex flex-column">
                  <i
                    className="bi bi-bar-chart-line-fill text-primary fs-4"
                    title="Performance"
                    style={{ cursor: "pointer" }}
                    onClick={() => alert("Performance page coming soon!")}
                  ></i>
                  <i
                    className="bi bi-x-circle text-danger fs-4"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemoveStudent(student.email)}
                    title="Remove Student"
                  ></i>
                </div>
          <i className="bi bi-person-check text-success fs-4 me-2"></i>
        </div>
      </div>
    </div>
  </div>
))}

{pendingStudents.map((student, idx) => (
  <div key={idx} className="col-md-6 col-lg-4">
    <div className="card pending-card shadow-sm rounded-4 p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h6 className="fw-semibold mb-1">{student.email}</h6>
          <small className="text-muted">Pending</small>
        </div>
        <div className="d-flex flex-column align-items-end">
            <button className="btn btn-outline-primary btn-sm mb-2">Performance</button>
            <i
                  className="bi bi-x-circle text-danger fs-4"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRemoveStudent(student.email)}
                  ></i>
                </div>
      </div>
    </div>
  </div>
))}

    </div>
  );
};

export default StudentTab;
