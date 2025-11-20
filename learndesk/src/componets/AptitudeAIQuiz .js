import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BookOpen, Clock, Shield } from "lucide-react";

const categories = [
  { name: "Maths Aptitude", category: 19, desc: "Science: Mathematics" },
  { name: "General Science", category: 17, desc: "Science & Nature" },
  { name: "Computer Aptitude", category: 18, desc: "Science: Computers" },
  { name: "Gadgets", category: 20, desc: "Science: Gadgets" },
  { name: "Current Affairs", category: 23, desc: "History" },
  { name: "Geography", category: 22, desc: "Geography" },
  { name: "History", category: 23, desc: "History" },
  { name: "Politics", category: 24, desc: "Politics" },
  { name: "Sports", category: 21, desc: "Sports" },
];

export default function RandomQuiz() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [modalQuiz, setModalQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [examStarted, setExamStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1200); 
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchQuestions = async (categoryId) => {
    setLoading(true);
    setQuestions([]);
    setSubmitted(false);
    setScore(0);

    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=15&category=${categoryId}&type=multiple`
      );
      const data = await res.json();
      const formatted = (data.results || []).map((q) => ({
        ...q,
        options: [...q.incorrect_answers, q.correct_answer].sort(
          () => Math.random() - 0.5
        ),
      }));
      setQuestions(formatted);
    } catch (err) {
      console.error(err);
      alert("Failed to load questions");
    }
    setLoading(false);
  };

  const handleAnswerChange = (index, option) => {
    setUserAnswers({ ...userAnswers, [index]: option });
  };

  const handleSubmit = useCallback(async () => {
    let s = 0;
    const quizQuestions = questions.map((q, i) => {
      if (userAnswers[i] === q.correct_answer) s++;
      return {
        question: q.question,
        options: q.options,
        correct_answer: q.correct_answer,
        user_answer: userAnswers[i] || null,
      };
    });
    setScore(s);
    setSubmitted(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/random-quiz/save`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            quizName: selectedCategory.name,
            questions: quizQuestions,
            totalMarks: s,
          }),
        }
      );
      await res.json();
    } catch (err) {
      console.error("Failed to save quiz:", err);
    }

    alert(`✅ You scored ${s}/${questions.length}`);
    handleForceExit();
    // eslint-disable-next-line
  }, [questions, userAnswers, selectedCategory, user.email]);

  useEffect(() => {
    const disable = (e) => e.preventDefault();
    const events = ["copy", "cut", "paste", "contextmenu", "selectstart"];
    events.forEach((ev) => document.addEventListener(ev, disable));
    return () =>
      events.forEach((ev) => document.removeEventListener(ev, disable));
  }, []);

  useEffect(() => {
    const handleBlur = () => {
      if (examStarted && !submitted) {
        alert("Tab switching is not allowed! Submitting your quiz...");
        handleSubmit();
      }
    };
    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, [examStarted, submitted, handleSubmit]);

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/random-quiz/history/${user.email}`
      );
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
    // eslint-disable-next-line
  }, [user.email]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleForceExit = useCallback(() => {
    setExamStarted(false);
    setSelectedCategory(null);
    setQuestions([]);
    setUserAnswers({});
    setSubmitted(false);
    setTimeLeft(1200);
    document.exitFullscreen?.().catch(() => {});
    fetchHistory();
  }, [fetchHistory]);

  const startExam = async () => {
    const elem = document.documentElement;
    try {
      await elem.requestFullscreen?.();
    } catch {
      console.warn("Fullscreen not supported");
    }
    setExamStarted(true);
  };

  useEffect(() => {
    if (!examStarted || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("⏰ Time’s up! Auto-submitting...");
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examStarted, submitted, handleSubmit]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 fw-bold text-primary">
        <BookOpen className="me-2" /> Random Quiz
      </h2>

      {!selectedCategory && !examStarted && (
        <div className="row">
          {categories.map((cat, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div
                className="card shadow border-0 h-100"
                style={{ cursor: "pointer", transition: "0.3s" }}
                onClick={() => {
                  setSelectedCategory(cat);
                  fetchQuestions(cat.category);
                }}
              >
                <div className="card-body text-center">
                  <h5 className="fw-bold text-primary">{cat.name}</h5>
                  <p className="text-muted">{cat.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading questions...</p>
        </div>
      )}

      {selectedCategory && !loading && questions.length > 0 && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.85)" }}
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content position-relative">
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
                    {user.email || "CONFIDENTIAL"}
                  </span>
                ))}
              </div>

              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{selectedCategory.name}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleForceExit}
                ></button>
              </div>

              <div className="modal-body position-relative" style={{ zIndex: 1 }}>
                {!examStarted ? (
                  <div className="text-center mt-5">
                    <Shield size={64} className="text-warning mb-3" />
                    <h4>Exam Instructions</h4>
                    <p className="text-muted">
                      Copy, paste, right-click, and tab switching are disabled.  
                      Enter fullscreen before starting your quiz.
                    </p>
                    <button className="btn btn-success btn-lg" onClick={startExam}>
                      Start Quiz
                    </button>
                  </div>
                ) : !submitted ? (
                  <div className="container-fluid mt-3">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="card p-3 shadow rounded-4 position-relative overflow-hidden">
                          <div
                            className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-wrap justify-content-center align-content-center"
                            style={{
                              pointerEvents: "none",
                              fontSize: "1.3rem",
                              fontWeight: 700,
                              color: "rgba(0,0,0,0.08)",
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
                                {user.email || "CONFIDENTIAL"}
                              </span>
                            ))}
                          </div>

                          <h5
                            dangerouslySetInnerHTML={{
                              __html: `${currentIndex + 1}. ${questions[currentIndex].question}`,
                            }}
                          />
                          {questions[currentIndex].options.map((opt, i) => (
                            <div className="form-check my-2" key={i}>
                              <input
                                type="radio"
                                className="form-check-input"
                                name={`q${currentIndex}`}
                                checked={userAnswers[currentIndex] === opt}
                                onChange={() => handleAnswerChange(currentIndex, opt)}
                              />
                              <label
                                className="form-check-label"
                                dangerouslySetInnerHTML={{ __html: opt }}
                              />
                            </div>
                          ))}

                          <div className="mt-4 d-flex justify-content-between">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => setCurrentIndex((p) => Math.max(p - 1, 0))}
                              disabled={currentIndex === 0}
                            >
                              Previous
                            </button>
                            <button
                              className="btn btn-outline-primary"
                              onClick={() =>
                                setCurrentIndex((p) => Math.min(p + 1, questions.length - 1))
                              }
                              disabled={currentIndex === questions.length - 1}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="card shadow rounded-4 p-3 text-center">
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
                            {questions.map((_, index) => (
                              <button
                                key={index}
                                className={`btn ${
                                  userAnswers[index]
                                    ? "btn-success"
                                    : "btn-secondary"
                                } ${
                                  index === currentIndex
                                    ? "border border-primary border-3"
                                    : ""
                                }`}
                                onClick={() => setCurrentIndex(index)}
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

                          <div className="mt-3">
                            <p>
                              Attempted:{" "}
                              <strong>{Object.keys(userAnswers).length}</strong>
                            </p>
                            <p>
                              Remaining:{" "}
                              <strong>
                                {questions.length -
                                  Object.keys(userAnswers).length}
                              </strong>
                            </p>
                            <button
                              className="btn btn-success w-100 mt-2"
                              onClick={handleSubmit}
                            >
                              Submit Quiz
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-success mt-5">
                    <h3>✅ Quiz Submitted!</h3>
                    <h5>
                      Score: {score}/{questions.length}
                    </h5>
                    <p>Redirecting to Random Quiz...</p>
                    {setTimeout(handleForceExit, 2000)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {modalQuiz && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content shadow-lg rounded-3">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{modalQuiz.quizName} - Summary</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setModalQuiz(null)}
                ></button>
              </div>

              <div className="modal-body">
                <h5 className="text-center">
                  Total Marks: <strong>{modalQuiz.totalMarks}</strong>
                </h5>
                <hr />

                {modalQuiz.questions.map((q, idx) => {
                  const userAns = q.user_answer;
                  const correctAns = q.correct_answer;

                  return (
                    <div className="card p-3 m-3 shadow-sm" key={idx}>
                      <h6
                        className="fw-bold"
                        dangerouslySetInnerHTML={{
                          __html: `Question ${idx + 1}: ${q.question}`,
                        }}
                      />

                      <div className="mt-2">
                        {q.options.map((opt, i) => {
                          const isUserSelected = opt === userAns;
                          const isCorrect = opt === correctAns;

                          let bgColor = "white";
                          if (isUserSelected && isCorrect) bgColor = "#d4edda"; // green
                          else if (isUserSelected && !isCorrect) bgColor = "#f8d7da"; // red
                          else if (isCorrect) bgColor = "#cce5ff"; // blue

                          return (
                            <div
                              key={i}
                              className="p-2 m-1 border rounded"
                              style={{ backgroundColor: bgColor }}
                              dangerouslySetInnerHTML={{ __html: opt }}
                            />
                          );
                        })}
                      </div>

                      <p className="mt-2">
                        Your Answer:{" "}
                        <b style={{ color: userAns === correctAns ? "green" : "red" }}>
                          {userAns || "Not Answered"}
                        </b>
                      </p>
                      <p>
                        Correct Answer: <b>{correctAns}</b>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}



      {!selectedCategory && history.length > 0 && (
        <div className="mt-5">
          <h3 className="text-primary mb-3">
            <Clock className="me-2" /> Previous Attempts
          </h3>
          {history.map((h, idx) => (
            <div className="card mb-2 shadow-sm" key={idx}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="fw-bold text-dark">
                    {h.quizName} - Score: {h.totalMarks}/{h.questions.length}
                  </h5>
                  <p className="text-muted">
                    {new Date(h.date).toLocaleString()}
                  </p>
                </div>
                <button className="btn btn-outline-primary btn-sm" onClick={() => setModalQuiz(h)} > View Details </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
