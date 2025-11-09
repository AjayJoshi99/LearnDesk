import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./styles/QuizzezDashboard.css";

function NonVerbalReasoning() {
  const navigate = useNavigate();

  const handleOnClick = (id, name) => {
    localStorage.setItem("quizName", name);
    navigate(`/user/Exam/${id}`);
  };

  const quizzes = [
    { id: 7, name: "Blood Relation - I" },
    { id: 8, name: "Direction and Senses" },
    { id: 9, name: "Find the Odd" },
    { id: 33, name: "Classification" },
    { id: 10, name: "Verification of Truth" },
  ];

  return (
    <div className="container py-2">
      <div className="mb-2">
        <button
          className="btn back-btn d-flex align-items-center gap-2 shadow-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      <div className="text-center mb-5">
        <h2 className="fw-bold text-dark mb-2 heading-text">Non Verbal Reasoning</h2>
        <p className="text-muted">
          Test your logical thinking and visualization skills with these non-verbal reasoning quizzes
        </p>
      </div>

      <div className="row justify-content-center g-4">
        {quizzes.map((quiz, index) => (
          <div key={index} className="col-md-4 col-sm-6 col-10">
            <div className="card quiz-card h-100 text-center p-4">
              <h5 className="fw-semibold mb-3">{quiz.name}</h5>
              <button
                className="btn btn-theme w-100 fw-semibold"
                onClick={() => handleOnClick(quiz.id, quiz.name)}
              >
                Start Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NonVerbalReasoning;
