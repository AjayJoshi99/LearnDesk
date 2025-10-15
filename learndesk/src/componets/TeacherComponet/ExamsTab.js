import React, { useEffect, useState } from "react";

const ExamTab = ({ teacherEmail }) => {
  const [baseExams, setBaseExams] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");

  const classCode = localStorage.getItem("currentClassCode");
  const teacherEmailStored = JSON.parse(localStorage.getItem("user"))?.email;
  teacherEmail = teacherEmail || teacherEmailStored;
  // ✅ Fetch all base exams created by teacher
  const fetchBaseExams = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/scheduled-exams/base/teacher/${teacherEmailStored}`
      );
      const data = await res.json();
      if (res.ok && Array.isArray(data.exams)) {
        setBaseExams(data.exams);
      } else {
        setBaseExams([]);
      }
    } catch (err) {
      console.error("Error fetching base exams:", err);
    }
  };

  const fetchScheduledExams = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/scheduled-exams/teacher/${teacherEmailStored}`
      );
      const data = await res.json();
      if (res.ok) {
        setUpcoming(data.upcoming || []);
        setCompleted(data.completed || []);
      }
    } catch (err) {
      console.error("Error fetching scheduled exams:", err);
    }
  };

  useEffect(() => {
    fetchBaseExams();
    fetchScheduledExams();
  }, [teacherEmail]);

  const handleScheduleExam = async () => {
    if (!selectedExam || !date || !duration) return alert("Please fill all fields.");

    try {
      const body = { examId: selectedExam, teacherEmail, date, duration, classCode };

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/scheduled-exams/schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        alert("Exam scheduled successfully!");
        setShowModal(false);
        setSelectedExam("");
        setDate("");
        setDuration("");
        fetchScheduledExams();
      }
    } catch (err) {
      console.error("Error scheduling exam:", err);
    }
  };

  const handleDeleteExam = async (id) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/scheduled-exams/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchScheduledExams();
    } catch (err) {
      console.error("Error deleting exam:", err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-primary d-flex align-items-center">
          <i className="bi bi-calendar-check me-2 text-warning"></i>
          Scheduled Exams
        </h4>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Schedule New Exam
        </button>
      </div>

      {/* --- Upcoming Exams --- */}
      <h5 className="text-success mt-4 mb-3">Upcoming Exams</h5>
      {upcoming.length === 0 ? (
        <p className="text-muted">No upcoming exams</p>
      ) : (
        upcoming.map((exam) => (
          <div
            key={exam._id}
            className="card mb-3 border-0 shadow-sm rounded-4"
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-semibold text-primary mb-1">{exam.examId?.title}</h6>
                <p className="text-muted small mb-0">
                  {new Date(exam.date).toLocaleString()} — {exam.duration} mins
                </p>
              </div>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDeleteExam(exam._id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))
      )}

      {/* --- Completed Exams --- */}
      <h5 className="text-secondary mt-4 mb-3">Completed Exams</h5>
      {completed.length === 0 ? (
        <p className="text-muted">No completed exams</p>
      ) : (
        completed.map((exam) => (
          <div
            key={exam._id}
            className="card mb-3 border-0 shadow-sm rounded-4"
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-semibold text-dark mb-1">{exam.examId?.title}</h6>
                <p className="text-muted small mb-0">
                  {new Date(exam.date).toLocaleString()}
                </p>
              </div>
              <button className="btn btn-outline-primary btn-sm" disabled>
                View Result
              </button>
            </div>
          </div>
        ))
      )}

      {/* --- Schedule Exam Modal --- */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4">
              <div className="modal-header">
                <h5 className="modal-title">Schedule New Exam</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Select Exam</label>
                  <select
                    className="form-select"
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                  >
                    <option value="">-- Select Exam --</option>
                    {baseExams.length > 0 ? (
                      baseExams.map((exam) => (
                        <option key={exam._id} value={exam._id}>
                          {exam.title}
                        </option>
                      ))
                    ) : (
                      <option disabled>No exams found</option>
                    )}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Exam Date & Time</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Duration (in minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleScheduleExam}
                  disabled={!selectedExam || !date || !duration}
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamTab;
