import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function History() {
  const [history, setHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/user/history/${user.email}`);
        const data = await res.json();
        
        // Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setHistory(data);
        } else if (data.quizHistory && Array.isArray(data.quizHistory)) {
          setHistory(data.quizHistory);
        } else {
          setHistory([]); // fallback if API returns error object
          console.warn("History data is not an array:", data);
        }
      } catch (err) {
        console.error("Failed to fetch history:", err);
        setHistory([]);
      }
    }

    fetchHistory();
  }, [user.email]);

  return (
    <div className="container mt-3">
      <h2>Your Quiz History</h2>
      {history.length === 0 ? (
        <p>No quizzes attempted yet.</p>
      ) : (
        history.map((quiz, idx) => (
          <div key={idx} className="card m-3 p-3 shadow-sm">
            <h4>{quiz.quizName}</h4>
            <p>Marks: {quiz.totalMarks}</p>
            <p>Date: {quiz.date ? new Date(quiz.date).toLocaleString() : "N/A"}</p>

            <button
              className="btn btn-sm btn-primary"
              onClick={() =>
                navigate(`/user/history/quiz/${quiz.quizNumber}`, {
                  state: { quiz }, // send quiz result data
                })
              }
            >
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default History;
