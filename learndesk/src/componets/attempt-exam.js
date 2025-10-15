import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AttemptExam = () => {
  const navigate = useNavigate();
  const storedExam = JSON.parse(localStorage.getItem("currentExam"));
  const [exam] = useState(storedExam || null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const totalQuestions = exam.questions.length;
  const attemptedCount = Object.keys(answers).length;
  // const userEmail = JSON.parse(localStorage.getItem("user"))?.email || "User";

  // 🔒 Disable Copy, Paste, Right-Click, Text Selection
  useEffect(() => {
    const disable = (e) => e.preventDefault();
    const events = ["copy", "cut", "paste", "contextmenu", "selectstart"];
    events.forEach(ev => document.addEventListener(ev, disable));
    return () => events.forEach(ev => document.removeEventListener(ev, disable));
  }, []);

  // 🚫 Detect Tab Switch / Window Blur
  useEffect(() => {
    const handleBlur = () => {
      if (examStarted && !submitted) {
        alert("Tab switching is not allowed during the exam!");
        handleForceExit();
      }
    };
    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
    // eslint-disable-next-line
  }, [examStarted, submitted]);

  // ✅ Fullscreen and Start Exam
  const startExam = async () => {
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) await elem.requestFullscreen();
      else if (elem.webkitRequestFullscreen) await elem.webkitRequestFullscreen();
      else if (elem.msRequestFullscreen) await elem.msRequestFullscreen();
    } catch (err) {
      console.warn("Fullscreen not allowed:", err);
    }
    setExamStarted(true);
  };

  // ✅ Safe exit and cleanup
  const handleForceExit = () => {
    setSubmitted(true);
    setShowModal(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {}); // safe fallback
    }
    navigate(-1);
  };

  const handleOptionChange = (qIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = () => {
    if (submitted) return; // prevent multiple triggers
    let score = 0;
    exam.questions.forEach((q, index) => {
      if (q.options[answers[index]] === q.correctAnswer) score++;
    });
    alert(`✅ You scored ${score} out of ${totalQuestions}`);
    handleForceExit();
  };
  if (!exam) return <div>No exam found!</div>;
  return (
    <div className="position-relative w-100 h-100">
  
      {/* Fullscreen Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content bg-light position-relative" style={{ zIndex: 1 }}>
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{exam.title}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleForceExit}
                ></button>
              </div>

              <div className="modal-body">
                {!examStarted ? (
                  <div className="text-center mt-5">
                    <h4 className="text-primary">Exam Instructions</h4>
                    <p className="text-muted mt-3">
                      Once you start, the exam will open in fullscreen.
                      Copy, paste, right-click, and tab switching are disabled.
                    </p>
                    <button className="btn btn-success btn-lg mt-3" onClick={startExam}>
                      Start Exam
                    </button>
                  </div>
                ) : (
                  <div className="container-fluid mt-3">
                    <div className="row">
                      {/* Left Panel */}
                      <div className="col-md-8">
                        <div className="card mb-3 shadow rounded-4 p-3">
                          <h5>
                            {currentQuestion + 1}. {exam.questions[currentQuestion].questionText}
                          </h5>

                          {exam.questions[currentQuestion].options.map((opt, oIndex) => (
                            <div className="form-check mt-2" key={oIndex}>
                              <input
                                className="form-check-input"
                                type="radio"
                                name={`question-${currentQuestion}`}
                                checked={answers[currentQuestion] === oIndex}
                                onChange={() => handleOptionChange(currentQuestion, oIndex)}
                              />
                              <label className="form-check-label">{opt}</label>
                            </div>
                          ))}

                          <div className="mt-4 d-flex justify-content-between">
                            <button
                              className="btn btn-outline-primary"
                              onClick={handlePrev}
                              disabled={currentQuestion === 0}
                            >
                              Previous
                            </button>
                            <button
                              className="btn btn-outline-warning"
                              onClick={() =>
                                setAnswers((prev) => {
                                  const newAnswers = { ...prev };
                                  delete newAnswers[currentQuestion];
                                  return newAnswers;
                                })
                              }
                            >
                              Clear
                            </button>
                            <button
                              className="btn btn-outline-primary"
                              onClick={handleNext}
                              disabled={currentQuestion === totalQuestions - 1}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right Panel */}
                      <div className="col-md-4">
                        <div className="card shadow rounded-4 p-3">
                          <div
                            className="d-grid"
                            style={{
                              gridTemplateColumns: "repeat(5, 1fr)",
                              gap: "8px",
                              justifyItems: "center",
                            }}
                          >
                            {exam.questions.map((_, index) => (
                              <button
                                key={index}
                                className={`btn ${
                                  answers[index] !== undefined ? "btn-success" : "btn-secondary"
                                } ${index === currentQuestion ? "border border-primary border-3" : ""}`}
                                onClick={() => setCurrentQuestion(index)}
                                style={{
                                  width: "48px",
                                  height: "48px",
                                  borderRadius: "50%",
                                  fontWeight: "bold",
                                  textAlign: "center",
                                  lineHeight: "1",
                                  margin: "2px",
                                  padding: 0,
                                }}
                              >
                                {index + 1}
                              </button>
                            ))}
                          </div>

                          <div className="mt-3 text-center">
                            <p>
                              Attempted: <strong>{attemptedCount}</strong>
                            </p>
                            <p>
                              Remaining: <strong>{totalQuestions - attemptedCount}</strong>
                            </p>
                            <button
                              className="btn btn-success w-100 mt-2"
                              onClick={handleSubmit}
                            >
                              Submit Exam
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttemptExam;
