import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./styles/QuizzezDashboard.css";

function LogicalReasoning() {
  const navigate = useNavigate();

  const handleOnClick = (id, name) => {
    localStorage.setItem("quizName", name);
    navigate(`/user/Exam/${id}`);
  };

  const quizzes = [
    { id: 0, name: "Number Series - I" },
    { id: 1, name: "Number Series - II" },
    { id: 31, name: "Number Series - III" },
    { id: 11, name: "Letter and Symbol Series" },
    { id: 24, name: "Theme Detection" },
    { id: 25, name: "Artificial Language" },
    { id: 26, name: "Essential Part" },
    { id: 27, name: "Verbal Classification" },
    { id: 28, name: "Analogies" },
  ];

  return (
    <div className="container py-2">
      <div className="mb-2">
        <button
          className="btn back-btn text-dark d-flex align-items-center gap-2 shadow-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      <div className="text-center mb-5">
        <h2 className="fw-bold mb-2 heading-text">Logical Reasoning</h2>
        <p className="text-muted">
          Sharpen your reasoning and pattern recognition skills with these logical quizzes
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

export default LogicalReasoning;
