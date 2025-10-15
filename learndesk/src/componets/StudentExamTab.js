import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentExamTab = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const classCode = localStorage.getItem("currentClassCode");
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/scheduled-exams/class/${classCode}`
        );
        const data = await res.json();
        setExams(data.exams || []);
      } catch (err) {
        console.error("Error fetching exams:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  const handleAttemptExam = (exam) => {
    localStorage.setItem("currentExam", JSON.stringify(exam.examId));
    console.log("Navigating to attempt exam:", exam.examId);
    navigate(`/user/attempt-exam/${exam.examId?._id}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
        <div className="spinner-border text-primary mb-3" role="status"></div>
        <h6 className="text-secondary">Loading exams...</h6>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold text-primary mb-4">
        📘 Available Exams
      </h2>

      <div className="row">
        {exams.length > 0 ? (
          exams.map((exam, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div className="card border-0 shadow-lg rounded-4 h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fw-semibold text-dark mb-2">
                      {exam.examId?.title || "Untitled Exam"}
                    </h5>
                    <p className="card-text text-muted small">
                      {exam.examId?.description || "No description available."}
                    </p>
                    <hr />
                    <p className="mb-1">
                      <strong>Teacher:</strong>{" "}
                      <span className="text-secondary">
                        {exam.teacherEmail || "Unknown"}
                      </span>
                    </p>
                    <p className="mb-2">
                      <strong>Date:</strong>{" "}
                      <span className="text-secondary">
                        {exam.date
                          ? new Date(exam.date).toLocaleString()
                          : "Not scheduled"}
                      </span>
                    </p>
                  </div>

                  {/* Always allow attempt (for testing) */}
                  <button
                    className="btn btn-primary fw-semibold mt-3"
                    onClick={() => handleAttemptExam(exam)}
                  >
                    Attempt Exam
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted mt-5">
            <h6>No exams available for this class yet.</h6>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentExamTab;
