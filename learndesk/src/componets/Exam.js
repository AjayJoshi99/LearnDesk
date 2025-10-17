import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "./ExamData.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArrowLeft, CheckCircle } from "lucide-react";

function Exam() {
  const { num } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(true);
  const [examStarted, setExamStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [totalMarks, setTotalMarks] = useState(0);
  const [userAnswer, setUserAnswer] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);

  const obj = data.find((exam) => exam.e === num);
  const quizName = `Quiz-${num}`;
  const totalQuestions = obj?.Question?.length || 0;
  const attemptedCount = Object.keys(userAnswer).length;

  // ✅ Option select
  const handleOptionChange = (index, input, correct) => {
    setUserAnswer((prev) => ({ ...prev, [index]: input }));
    if (input === correct) setTotalMarks((prev) => prev + 1);
  };

  // ✅ Safe exit
  const handleForceExit = useCallback(() => {
    setSubmitted(true);
    setShowModal(false);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    navigate("/user/dashboard");
  }, [navigate]);

  // ✅ Start Exam
  const startExam = async () => {
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) await elem.requestFullscreen();
    } catch (err) {
      console.warn("Fullscreen not allowed:", err);
    }
    setExamStarted(true);
  };

   const handleTimeUp = useCallback(async () => {
    if (showResults) return;
    setShowResults(true);
    setSubmitted(true);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("User not logged in!");
      navigate("/login");
      return;
    }

    const resultData = {
      email: user.email,
      quizNumber: num,
      quizName,
      totalMarks,
      answers: userAnswer,
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/user/save-quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultData),
      });
      await res.json();
      if (document.fullscreenElement) await document.exitFullscreen();
      setTimeout(() => navigate("/user/dashboard"), 1500);
    } catch (error) {
      console.error("Error saving quiz:", error);
      navigate("/user/dashboard");
    }
  }, [showResults, navigate, num, quizName, totalMarks, userAnswer]);
// ...existing code...

  // ✅ Timer
  useEffect(() => {
    if (!examStarted || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("⏰ Time’s up! Auto-submitting...");
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examStarted, submitted, handleTimeUp]);

  // ✅ Restriction Logic
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden && examStarted && !submitted) {
      alert("⚠️ Tab switching not allowed!");
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
    if (submitted) return; // 🧠 stop enforcing after submission
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [handleVisibilityChange, handleFullscreenChange, submitted]);

  // ✅ Disable Copy/Paste/Right-click
  useEffect(() => {
    const disable = (e) => e.preventDefault();
    const events = ["copy", "cut", "paste", "contextmenu", "selectstart"];
    events.forEach((ev) => document.addEventListener(ev, disable));
    return () => events.forEach((ev) => document.removeEventListener(ev, disable));
  }, []);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (!obj) return <div>No exam found!</div>;

  return (
    <div className="position-relative w-100 h-100 bg-light">
      <div className="text-start mb-3 p-3">
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} className="me-2" /> Back
        </button>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.85)" }}
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content bg-light position-relative">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{quizName}</h5>
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
                      Once started, exam will open in fullscreen.  
                      Tab switching, copy, paste, and right-click are disabled.
                    </p>
                    <button
                      className="btn btn-success btn-lg mt-3"
                      onClick={startExam}
                    >
                      Start Exam
                    </button>
                  </div>
                ) : !showResults ? (
                  <div className="container-fluid mt-3">
                    <div className="row">
                      {/* LEFT SIDE */}
                      <div className="col-md-8">
                        <div className="card mb-3 shadow rounded-4 p-3 position-relative overflow-hidden">

                          {/* Background pattern */}
                          <div
                            className="position-absolute top-0 start-0 w-100 h-100"
                            style={{
                              pointerEvents: "none",
                              backgroundImage: `
                                repeating-linear-gradient(
                                  45deg,
                                  rgba(0, 0, 0, 0.03) 0,
                                  rgba(0, 0, 0, 0.03) 1px,
                                  transparent 1px,
                                  transparent 80px
                                ),
                                repeating-linear-gradient(
                                  -45deg,
                                  rgba(0, 0, 0, 0.03) 0,
                                  rgba(0, 0, 0, 0.03) 1px,
                                  transparent 1px,
                                  transparent 80px
                                )`,
                              backgroundSize: "200px 200px",
                              opacity: 0.08,
                            }}
                          ></div>

                          {/* Watermark */}
                          <div
                            className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-wrap justify-content-center align-content-center"
                            style={{
                              pointerEvents: "none",
                              fontSize: "1.3rem",
                              fontWeight: 600,
                              color: "rgba(0, 0, 0, 0.12)", 
                              userSelect: "none",
                              overflow: "hidden",
                            }}
                          >
                            {[...Array(16)].map((_, i) => (
                              <span
                                key={i}
                                style={{
                                  flex: "0 0 33%",
                                  textAlign: "center",
                                  transform: "rotate(-30deg)",
                                  margin: "25px 0",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {JSON.parse(localStorage.getItem("user"))?.email || "CONFIDENTIAL"}
                              </span>
                            ))}
                          </div>

                          <h5 className="fw-bold position-relative">
                            Q{currentQuestion + 1}. {obj.Question[currentQuestion][0]}
                          </h5>

                          {[1, 2, 3, 4].map((opt) => (
                           <div key={opt} className="form-check my-2 position-relative">
                                      <input
                                        id={`q${currentQuestion}-opt${opt}`}
                                        className="form-check-input"
                                        type="radio"
                                        name={`q${currentQuestion}`}  
                                        checked={
                                          userAnswer[currentQuestion] ===
                                          obj.Question[currentQuestion][opt]
                                        }
                                        onChange={() =>
                                          handleOptionChange(
                                            currentQuestion,
                                            obj.Question[currentQuestion][opt],
                                            obj.Question[currentQuestion][5]
                                          )
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`q${currentQuestion}-opt${opt}`}
                                        style={{ cursor: "pointer" }}
                                      >
                                        {obj.Question[currentQuestion][opt]}
                                      </label>
                                    </div>

                          ))}

                          <div className="mt-4 d-flex justify-content-between">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() =>
                                setCurrentQuestion((p) => Math.max(p - 1, 0))
                              }
                              disabled={currentQuestion === 0}
                            >
                              Previous
                            </button>
                            <button
                              className="btn btn-outline-warning"
                              onClick={() =>
                                setUserAnswer((prev) => {
                                  const copy = { ...prev };
                                  delete copy[currentQuestion];
                                  return copy;
                                })
                              }
                            >
                              Clear
                            </button>
                            <button
                              className="btn btn-outline-primary"
                              onClick={() =>
                                setCurrentQuestion((p) =>
                                  Math.min(p + 1, totalQuestions - 1)
                                )
                              }
                              disabled={currentQuestion === totalQuestions - 1}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT SIDE */}
                      <div className="col-md-4">
                        <div className="card shadow rounded-4 p-3">
                          <div className="badge bg-danger fs-5 mb-3">
                            ⏱ {formatTime(timeLeft)}
                          </div>
                          <div
                            className="d-grid"
                            style={{
                              gridTemplateColumns: "repeat(5, 1fr)",
                              gap: "8px",
                              justifyItems: "center",
                            }}
                          >
                            {obj.Question.map((_, index) => (
                              <button
                                key={index}
                                className={`btn ${
                                  userAnswer[index]
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
                              Remaining:{" "}
                              <strong>{totalQuestions - attemptedCount}</strong>
                            </p>
                            <button
                              className="btn btn-success w-100 mt-2"
                              onClick={handleTimeUp}
                            >
                              Submit Exam
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center mt-5 text-success">
                    <CheckCircle size={50} className="mb-3" />
                    <h2>Exam Submitted!</h2>
                    <h4>Total Marks: {totalMarks}</h4>
                    <p>Redirecting to Dashboard...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exam;
