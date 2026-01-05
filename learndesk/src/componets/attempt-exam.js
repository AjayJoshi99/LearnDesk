import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AttemptExam = () => {
  const navigate = useNavigate();
  const storedExam = JSON.parse(localStorage.getItem("currentExam"));
  const [exam] = useState(storedExam || null);
  console.log("Loaded exam:", exam);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const duration = parseInt(localStorage.getItem("duration"), 10) || 10;
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const totalQuestions = exam?.questions?.length || 0;
  const attemptedCount = Object.keys(answers).length;
  const [markedForReview, setMarkedForReview] = useState({});

  const toggleMarkForReview = (index) => {
    setMarkedForReview((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


  const userEmail = JSON.parse(localStorage.getItem("user"))?.email || "CONFIDENTIAL";
  const classCode = localStorage.getItem("currentClassCode") || "unknown";

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // ✅ Handle Option Change
  const handleOptionChange = (qIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  // ✅ Navigation Controls
  const handleNext = () => currentQuestion < totalQuestions - 1 && setCurrentQuestion(currentQuestion + 1);
  const handlePrev = () => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1);

  // ✅ Force Exit Exam
  const handleForceExit = useCallback(() => {
    setSubmitted(true);
    setShowModal(false);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    navigate(-1);
  }, [navigate]);

  // ✅ Fullscreen Start
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

  // ✅ Timer Logic
  useEffect(() => {
    if (!examStarted || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("⏰ Time is up! Your exam has been auto-submitted.");
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examStarted, submitted]);

  // ✅ Adjust time if started late
  useEffect(() => {
    if (!exam?.startTime || !exam?.duration) return;
    const start = new Date(exam.startTime).getTime();
    const now = Date.now();
    const elapsed = Math.floor((now - start) / 1000);
    const total = exam.duration * 60;
    setTimeLeft(Math.max(total - elapsed, 0));
  }, [exam]);

  // ✅ Restriction Listeners
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden && examStarted && !submitted) {
      alert("⚠️ Tab switching is not allowed!");
      handleForceExit();
    }
  }, [examStarted, submitted, handleForceExit]);

  const handleFullscreenChange = useCallback(() => {
    if (!document.fullscreenElement && examStarted && !submitted) {
      alert("⚠️ You must stay in fullscreen mode!");
      handleForceExit();
    }
  }, [examStarted, submitted, handleForceExit]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [handleVisibilityChange, handleFullscreenChange]);

  // 🔒 Disable Copy, Paste, Right-Click, Text Selection
  useEffect(() => {
    const disable = (e) => e.preventDefault();
    const events = ["copy", "cut", "paste", "contextmenu", "selectstart"];
    events.forEach((ev) => document.addEventListener(ev, disable));
    return () => events.forEach((ev) => document.removeEventListener(ev, disable));
  }, []);

  // ✅ Submit Exam
  const handleSubmit = useCallback(async () => {
    if (submitted) return;
    setSubmitted(true);

    document.removeEventListener("visibilitychange", handleVisibilityChange);
    document.removeEventListener("fullscreenchange", handleFullscreenChange);

    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});

    let score = 0;
    const detailedAnswers = exam.questions.map((q, index) => {
      const selectedOption = q.options[answers[index]];
      const isCorrect = selectedOption === q.correctAnswer;
      if (isCorrect) score++;
      return {
        questionText: q.questionText,
        selectedOption,
        correctAnswer: q.correctAnswer,
        isCorrect,
      };
    });

    alert(`✅ You scored ${score} out of ${exam.questions.length}`);

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/results/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examId: exam._id,
          classCode,
          userEmail,
          score,
          totalQuestions: exam.questions.length,
          answers: detailedAnswers,
          duration: exam.duration,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Error saving result:", err);
    }

    handleForceExit();
  }, [answers, exam, userEmail, classCode, handleForceExit, handleVisibilityChange, handleFullscreenChange, submitted]);

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
                        <div className="card mb-3 shadow rounded-4 p-3 position-relative overflow-hidden">
                          {/* Background pattern */}
                          <div
                            className="position-absolute top-0 start-0 w-100 h-100"
                            style={{
                              backgroundImage: `
                                repeating-linear-gradient(
                                  45deg,
                                  rgba(0, 0, 0, 0.05) 0,
                                  rgba(0, 0, 0, 0.05) 1px,
                                  transparent 1px,
                                  transparent 80px
                                ),
                                repeating-linear-gradient(
                                  -45deg,
                                  rgba(0, 0, 0, 0.05) 0,
                                  rgba(0, 0, 0, 0.05) 1px,
                                  transparent 1px,
                                  transparent 80px
                                )
                              `,
                              backgroundSize: "200px 200px",
                              zIndex: 0,
                              opacity: 0.1,
                              pointerEvents: "none",
                            }}
                          ></div>

                          {/* Watermark text overlay */}
                          <div
                            className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-wrap justify-content-center align-content-center text-muted opacity-25 fw-bold"
                            style={{
                              fontSize: "1.5rem",
                              color: "rgba(0,0,0,0.1)",
                              pointerEvents: "none",
                              userSelect: "none",
                              overflow: "hidden",
                              zIndex: 0,
                            }}
                          >
                          {[...Array(20)].map((_, i) => (
                            <span
                              key={i}
                              style={{
                                flex: "0 0 33%",
                                textAlign: "center",
                                transform: "rotate(-30deg)",
                                margin: "30px 0",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {JSON.parse(localStorage.getItem("user"))?.email || "CONFIDENTIAL"}
                            </span>
                          ))}
                        </div>
                          <h5>
                            {currentQuestion + 1}. {exam.questions[currentQuestion].questionText}
                          </h5>

                          {exam.questions[currentQuestion].options.map((option, index) => (
                              <div key={index} className="form-check my-2">
                                <input
                                  type="radio"
                                  id={`q${currentQuestion}_opt${index}`}
                                  name={`question_${currentQuestion}`}
                                  checked={answers[currentQuestion] === index}
                                  onChange={() => handleOptionChange(currentQuestion, index)}
                                  className="form-check-input"
                                />
                                <label
                                  htmlFor={`q${currentQuestion}_opt${index}`}
                                  className="form-check-label option-label"
                                >
                                  {option}
                                </label>
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
                              className={`btn ${
                                markedForReview[currentQuestion]
                                  ? "btn-primary"
                                  : "btn-outline-secondary"
                              }`}
                              onClick={() => toggleMarkForReview(currentQuestion)}
                            >
                              {markedForReview[currentQuestion]
                                ? "Unmark Review"
                                : "Mark for Review"}
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
                      <div className="position-fixed top-0 end-0 p-3">
                        <div className="badge bg-danger fs-5 shadow">
                          ⏱ {formatTime(timeLeft)}
                        </div>
                      </div>

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
                                  markedForReview[index]
                                    ? "btn-primary"
                                    : answers[index] !== undefined
                                    ? "btn-success"
                                    : "btn-secondary"
                                } ${
                                  index === currentQuestion
                                    ? "border border-primary border-3"
                                    : ""
                                }`}

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
