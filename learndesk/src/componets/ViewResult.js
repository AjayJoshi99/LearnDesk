import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArrowLeft, Trophy, Clock, CheckCircle, XCircle } from "lucide-react";

const ViewResult = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email || "";

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/results/get/${examId}/${userEmail}`
        );
        const data = await res.json();
        if (res.ok) setResult(data);
      } catch (error) {
        console.error("Error fetching result:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [examId, userEmail]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
        <div className="spinner-border text-primary mb-3" role="status"></div>
        <h6 className="text-secondary">Fetching your result...</h6>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container text-center mt-5">
        <h5 className="text-danger">❌ Result not found for this exam.</h5>
        <button className="btn btn-outline-primary mt-3" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} className="me-2" />
          Back
        </button>
      </div>
    );
  }

  const percentage = ((result.score / result.totalQuestions) * 100).toFixed(2);
  const passed = percentage >= 50;

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <div className="mb-4">
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} className="me-2" />
          Back to Dashboard
        </button>
      </div>

      {/* Card */}
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <div className="text-center">
          <Trophy size={50} className="text-warning mb-3" />
          <h3 className="fw-bold text-primary">Exam Result Summary</h3>
          <p className="text-muted mb-4">{result.examId?.title || "Untitled Exam"}</p>
        </div>

        <div className="row text-center mb-4">
          <div className="col-md-3 mb-3 mb-md-0">
            <h5 className="fw-bold">{result.score}</h5>
            <p className="text-muted small">Score</p>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <h5 className="fw-bold">{result.totalQuestions}</h5>
            <p className="text-muted small">Total Questions</p>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <h5 className={`fw-bold ${passed ? "text-success" : "text-danger"}`}>
              {percentage}%
            </h5>
            <p className="text-muted small">Percentage</p>
          </div>
          <div className="col-md-3">
            <h5 className="fw-bold">
              <Clock size={18} className="me-1" />
              {result.duration || "—"} min
            </h5>
            <p className="text-muted small">Duration</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between small mb-1">
            <span className="text-secondary">Performance</span>
            <span className="fw-semibold">{percentage}%</span>
          </div>
          <div className="progress rounded-pill" style={{ height: "12px" }}>
            <div
              className={`progress-bar ${passed ? "bg-success" : "bg-danger"}`}
              role="progressbar"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {result.answers && result.answers.length > 0 && (
          <div className="mt-4">
            <h5 className="fw-bold mb-3">🧾 Detailed Answers</h5>
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Your Answer</th>
                    <th>Correct Answer</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {result.answers.map((ans, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{ans.questionText || "—"}</td>
                      <td>{ans.selectedOption || "—"}</td>
                      <td>{ans.correctAnswer || "—"}</td>
                      <td>
                        {ans.isCorrect ? (
                          <span className="text-success fw-semibold">
                            <CheckCircle size={16} className="me-1" />
                            Correct
                          </span>
                        ) : (
                          <span className="text-danger fw-semibold">
                            <XCircle size={16} className="me-1" />
                            Wrong
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="text-end mt-4">
          <small className="text-muted">
            Submitted at: {new Date(result.submittedAt).toLocaleString()}
          </small>
        </div>
      </div>
    </div>
  );
};

export default ViewResult;
