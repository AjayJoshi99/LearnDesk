import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Play, Clock } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentExamTab = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attemptedExams, setAttemptedExams] = useState({});
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email || "unknown@student";
  const classCode = localStorage.getItem("currentClassCode");

  // ✅ Save missed exam (0 score)
  const saveMissedExamResult = useCallback(
    async (exam) => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/results/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            examId: exam.examId?._id,
            classCode,
            userEmail,
            score: 0,
            totalQuestions: exam.examId?.questions?.length || 0,
            answers: [],
            missed: true,
          }),
        });
        await res.json();
        console.log("Missed exam stored:", exam.examId?.title);
      } catch (err) {
        console.error("Error storing missed exam:", err);
      }
    },
    [classCode, userEmail]
  );

  // ✅ Fetch exams
  useEffect(() => {
    const fetchExams = async () => {
      try {
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
  }, [classCode]);

  // ✅ Fetch attempted exams
  useEffect(() => {
    const fetchAttemptedStatus = async () => {
      const results = {};
      for (const exam of exams) {
        const examId = exam.examId?._id;
        if (!examId) continue;
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/api/results/check/${examId}/${userEmail}`
          );
          const data = await res.json();
          results[examId] = data.exists;
        } catch (err) {
          console.error("Error checking result:", err);
        }
      }
      setAttemptedExams(results);
    };
    if (exams.length > 0) fetchAttemptedStatus();
  }, [exams, userEmail]);

  // ✅ Handle exam start / view
  const handleAttemptExam = async (exam) => {
    const examId = exam.examId?._id;
    const startTime = new Date(exam.date);
    const now = new Date();
    const diffMinutes = (now - startTime) / (1000 * 60);

    // Already attempted
    if (attemptedExams[examId]) {
      navigate(`/user/result/${examId}`);
      return;
    }

    // Not started yet
    if (now < startTime) {
      alert(
        `Exam "${exam.examId?.title}" has not started yet.\nStarts at: ${startTime.toLocaleString()}`
      );
      return;
    }

    // Exam window closed
    if (diffMinutes > 15) {
      alert("You missed the exam. It will be marked as 0.");
      await saveMissedExamResult(exam);
      setAttemptedExams((prev) => ({ ...prev, [examId]: true }));
      return;
    }

    // Start exam
    localStorage.setItem("currentExam", JSON.stringify(exam.examId));
    navigate(`/user/attempt-exam/${examId}`);
  };

  // ✅ Auto-submit missed exams every minute
useEffect(() => {
  const timer = setInterval(async () => {
    setAttemptedExams(prevAttempted => {
      exams.forEach(async (exam) => {
        const examId = exam.examId?._id;
        if (!examId || prevAttempted[examId]) return;

        const startTime = new Date(exam.date);
        const now = new Date();
        const diffMinutes = (now - startTime) / (1000 * 60);

        if (diffMinutes > 2) {
          console.log(`Auto-submitting missed exam: ${exam.examId?.title}`);
          await saveMissedExamResult(exam);
          prevAttempted[examId] = true;
        }
      });
      return { ...prevAttempted }; // return new state to trigger re-render
    });
  }, 60000); // check every 1 min

  return () => clearInterval(timer);
}, [exams, saveMissedExamResult]);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
        <div className="spinner-border text-primary mb-3" role="status" />
        <h6 className="text-secondary">Loading exams...</h6>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold text-primary mb-4">Available Exams</h2>

      {exams.length === 0 ? (
        <div className="text-center text-secondary mt-5">
          <h5>No exams scheduled for this class yet.</h5>
        </div>
      ) : (
        <div className="row g-4">
          {exams.map((exam, index) => {
            const startTime = new Date(exam.date);
            const now = new Date();
            const diffMinutes = (now - startTime) / (1000 * 60);
            const isUpcoming = now < startTime;
            const isClosed = diffMinutes > 15;
            const examId = exam.examId?._id;
            const alreadyAttempted = attemptedExams[examId];

            return (
              <div key={index} className="col-md-6 col-lg-4">
                <div
                  className={`card shadow-sm border-0 rounded-4 h-100 ${
                    isClosed ? "opacity-75" : ""
                  }`}
                  style={{ borderLeft: "6px solid #007bff" }}
                >
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="fw-semibold text-dark mb-2">
                        {exam.examId?.title || "Untitled Exam"}
                      </h5>
                      <p className="text-muted small mb-1">
                        <Clock size={14} className="me-1" />
                        {startTime.toLocaleString()}
                      </p>
                      <p className="text-secondary small mb-2">
                        Teacher: {exam.teacherEmail || "Unknown"}
                      </p>
                      <p className="text-secondary small mb-3">
                        Total Questions: {exam.examId?.questions?.length || 0}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                      {alreadyAttempted ? (
                        <button
                          className="btn btn-success btn-sm px-3"
                          onClick={() => navigate(`/user/result/${examId}`)}
                        >
                          <FileText size={14} className="me-1" />
                          View Result
                        </button>
                      ) : isUpcoming ? (
                        <button className="btn btn-outline-secondary btn-sm px-3" disabled>
                          Not Started
                        </button>
                      ) : isClosed ? (
                        <button className="btn btn-outline-danger btn-sm px-3" disabled>
                          Closed
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm px-3"
                          onClick={() => handleAttemptExam(exam)}
                        >
                          <Play size={14} className="me-1" />
                          Start Exam
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentExamTab;
