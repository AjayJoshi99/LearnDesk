import React from "react";
import { Modal, Spinner, ProgressBar } from "react-bootstrap";

const PerformanceModal = ({ show, onHide, loading, summary }) => {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Student Performance</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loading ? (
          <div className="text-center my-3">
            <Spinner animation="border" />
            <p>Loading performance...</p>
          </div>
        ) : summary ? (
          <>
            <p>
              <strong>Overall Score:</strong> {summary.overallScore}%
            </p>
            <p>
              <strong>Total Quizzes:</strong> {summary.totalQuizzes}
            </p>
            <p>
              <strong>Attempted:</strong> {summary.attemptedQuizzes} |{" "}
              <strong>Missed:</strong> {summary.missedQuizzes}
            </p>

            <hr />
            <h6 className="fw-bold mb-3">Exam-wise Details</h6>
            {summary.performanceList && summary.performanceList.length > 0 ? (
              <div className="list-group">
                {summary.performanceList.map((exam, idx) => (
                  <div key={idx} className="list-group-item mb-2 rounded-3 shadow-sm">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{exam.examTitle}</strong>
                        <p className="text-muted mb-1">
                          {exam.score}/{exam.totalQuestions} correct
                        </p>
                      </div>
                      <span className="badge bg-primary fs-6">
                        {exam.accuracy}%
                      </span>
                    </div>
                    <ProgressBar
                      now={exam.accuracy}
                      label={`${exam.accuracy}%`}
                      variant={exam.accuracy >= 75 ? "success" : "warning"}
                      animated
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No exams attempted yet.</p>
            )}
          </>
        ) : (
          <p className="text-center text-muted">No performance data available.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PerformanceModal;
