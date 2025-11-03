import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./styles/QuizzezDashboard.css";

function VerbalAbility() {
  const navigate = useNavigate();

  const handleOnClick = (id, name) => {
    localStorage.setItem("quizName", name);
    navigate(`/user/Exam/${id}`);
  };

  const quizzes = [
    { id: 3, name: "Selecting Words" },
    { id: 4, name: "One Word Substitutes" },
    { id: 5, name: "Spellings" },
    { id: 6, name: "Sentence Formation" },
    { id: 22, name: "Synonyms" },
    { id: 23, name: "Sentence Improvement" },
    { id: 29, name: "Spotting Errors" },
    { id: 30, name: "Verbal Analogies" },
    { id: 32, name: "Antonyms" },
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
        <h2 className="fw-bold mb-2 heading-text">Verbal Ability</h2>
        <p className="text-muted">
          Improve your vocabulary, grammar, and comprehension with verbal ability tests
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

export default VerbalAbility;
