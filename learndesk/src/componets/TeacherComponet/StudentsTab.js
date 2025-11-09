import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/StudentTab.css";
import PerformanceModal from "./PerformanceModal";
import axios from "axios";

const StudentTab = () => {
  const classCode = localStorage.getItem("currentClassCode");
  const [students, setStudents] = useState([]);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [removingEmail, setRemovingEmail] = useState(null);
  const [message, setMessage] = useState(null);
  const [showPerfModal, setShowPerfModal] = useState(false);
  const [loadingPerf, setLoadingPerf] = useState(false);
  const [summary, setSummary] = useState(null);

  const handleViewPerformance = async (studentEmail) => {
    try {
      setShowPerfModal(true);
      setLoadingPerf(true);

      const classCode = localStorage.getItem("currentClassCode");

      // Fetch user performance (only student-level)
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/results/studentperformance/${studentEmail}/${classCode}`
      );

      setSummary(res.data.summary);
    } catch (err) {
      console.error("Error loading performance:", err);
      setSummary(null);
    } finally {
      setLoadingPerf(false);
    }
  };

  // ✅ Fetch students
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

  useEffect(() => {
    if (classCode) fetchStudents();
    // eslint-disable-next-line
  }, [classCode]);

  // ✅ Add student
  const handleAddStudent = async () => {
    if (!newStudentEmail.trim()) return;
    setActionLoading(true);
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
      if (res.ok) {
        setMessage({ type: "success", text: data.message });
        await fetchStudents();
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error adding student" });
    } finally {
      setNewStudentEmail("");
      setActionLoading(false);
    }
  };

  // ✅ Remove student
  const handleRemoveStudent = async (email) => {
    if (!window.confirm("Are you sure you want to remove this student?")) return;
    setRemovingEmail(email);
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
      if (res.ok) {
        setMessage({ type: "success", text: data.message });
        setStudents((prev) => prev.filter((s) => s.email !== email));
        setPendingStudents((prev) => prev.filter((s) => s.email !== email));
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error removing student" });
    } finally {
      setRemovingEmail(null);
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
            disabled={actionLoading}
          />
          <button
            className="btn btn-primary rounded-pill px-4"
            onClick={handleAddStudent}
            disabled={actionLoading}
          >
            {actionLoading ? (
              <span className="spinner-border spinner-border-sm me-2"></span>
            ) : (
              "Add"
            )}
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

      {loading ? (
        <p className="text-center text-muted">
          <span className="spinner-border spinner-border-sm me-2"></span>
          Loading students...
        </p>
      ) : students.length === 0 && pendingStudents.length === 0 ? (
        <p className="text-center text-muted">No students in this class.</p>
      ) : (
        <div className="row">
          {/* ✅ Active Students */}
          {students.map((student, idx) => (
            <div key={idx} className="col-md-6 col-lg-4">
              <div className="card student-card shadow-sm rounded-4 p-3 m-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="fw-semibold mb-1">{student.name}</h6>
                    <small className="text-muted">{student.email}</small>
                    <br />
                    <small className="text-muted">
                      Contact: {student.mobile}
                    </small>
                    <br />
                    <small className="text-success">{student.status}</small>
                  </div>
                  <div>
                    <div className="d-flex flex-column align-items-end">
                      <i
                        className="bi bi-bar-chart-line-fill text-primary mx-2"
                        title="View Performance"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleViewPerformance(student.email)}
                      ></i>

                      {removingEmail === student.email ? (
                        <div
                          className="spinner-border text-danger"
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        ></div>
                      ) : (
                        <i
                          className="bi bi-x-circle text-danger fs-4"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRemoveStudent(student.email)}
                          title="Remove Student"
                        ></i>
                      )}
                      <i className="bi bi-person-check text-success fs-4 mt-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* ✅ Pending Students */}
          {pendingStudents.map((student, idx) => (
            <div key={idx} className="col-md-6 col-lg-4">
              <div className="card pending-card shadow-sm rounded-4 p-3 m-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="fw-semibold mb-1">{student.email}</h6>
                    <small className="text-muted">Pending</small>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <button
                      className="btn btn-outline-primary btn-sm mb-2"
                      disabled
                    >
                      Performance
                    </button>

                    {removingEmail === student.email ? (
                      <div
                        className="spinner-border text-danger"
                        style={{ width: "1.5rem", height: "1.5rem" }}
                      ></div>
                    ) : (
                      <i
                        className="bi bi-x-circle text-danger fs-4"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemoveStudent(student.email)}
                      ></i>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <PerformanceModal
        show={showPerfModal}
        onHide={() => setShowPerfModal(false)}
        loading={loadingPerf}
        summary={summary}
      />
    </div>
  );
};

export default StudentTab;
