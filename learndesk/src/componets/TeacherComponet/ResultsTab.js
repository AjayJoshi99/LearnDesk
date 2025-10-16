import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ResultsTab = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const teacherEmail = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).email
    : "";

 const fetchExams = React.useCallback(async () => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/exam/teacher/${teacherEmail}`
    );
    const data = await res.json();
    setExams(data.exams || []);
  } catch (error) {
    console.error("Error fetching exams:", error);
  }
}, [teacherEmail]);

useEffect(() => {
  fetchExams();
}, [fetchExams]);

  const fetchResults = async (examId) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/exam/exams/${examId}`
      );
      const data = await res.json();
      setResults(data.results || []);
      setSelectedExam(examId);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching results:", error);
      setLoading(false);
    }
  };

  const viewStudentExam = (studentResult) => {
    setSelectedStudent(studentResult);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center text-primary fw-bold">
        Exam Results Dashboard
      </h3>

      {/* Exam List */}
      <div className="card shadow-sm p-3 mb-4">
        <h5 className="card-title mb-3">Your Exams</h5>
        {exams.length === 0 ? (
          <p className="text-muted">No exams found.</p>
        ) : (
          <table className="table table-bordered align-middle">
            <thead className="table-primary">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Show Results</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr key={exam._id}>
                  <td>{exam.title}</td>
                  <td>{exam.description}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => fetchResults(exam._id)}
                    >
                      Show Results
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Student Results */}
      {selectedExam && (
        <div className="card shadow-sm p-3">
          <h5 className="card-title mb-3 text-success">
            Results for Selected Exam
          </h5>
          {loading ? (
            <p>Loading...</p>
          ) : results.length === 0 ? (
            <p className="text-muted">No students have taken this exam yet.</p>
          ) : (
            <table className="table table-striped align-middle">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Student Email</th>
                  <th>Score</th>
                  <th>Total Questions</th>
                  <th>Submitted At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={r._id}>
                    <td>{i + 1}</td>
                    <td>{r.userEmail}</td>
                    <td>{r.score}</td>
                    <td>{r.totalQuestions}</td>
                    <td>{new Date(r.submittedAt).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => viewStudentExam(r)}
                      >
                        View Exam
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && selectedStudent && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(42, 37, 171, 0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Exam | Student: {selectedStudent.userEmail}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <h6 className="mb-3">
                  Score: {selectedStudent.score}/{selectedStudent.totalQuestions} (
                  {(
                    (selectedStudent.score / selectedStudent.totalQuestions) *
                    100
                  ).toFixed(2)}
                  %)
                </h6>

                {selectedStudent.answers.length === 0 ? (
                  <p className="text-warning">
                    Student missed the exam. No answers submitted.
                  </p>
                ) : (
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Question</th>
                        <th>Student Answer</th>
                        <th>Correct Answer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedStudent.answers.map((ans, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{ans.questionText}</td>
                          <td
                            style={{
                              color: !ans.selectedOption
                                ? "orange"
                                : ans.isCorrect
                                ? "green"
                                : "red",
                            }}
                          >
                            {ans.selectedOption || "Not Answered"}
                          </td>
                          <td>{ans.correctAnswer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsTab;
