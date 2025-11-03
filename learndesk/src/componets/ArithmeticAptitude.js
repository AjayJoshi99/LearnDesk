import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./styles/QuizzezDashboard.css";

function ArithmeticAptitude() {
  const navigate = useNavigate();

  const handleOnClick = (id, name) => {
    localStorage.setItem("quizName", name);
    navigate(`/user/Exam/${id}`);
  };

  const quizzes = [
    { id: 12, name: "Calendar" },
    { id: 13, name: "Clock" },
    { id: 14, name: "Time and Distance" },
    { id: 15, name: "Area" },
    { id: 16, name: "Simple Interest" },
    { id: 17, name: "Problems on Numbers" },
    { id: 18, name: "Odd Man Out and Series" },
    { id: 19, name: "Problems on Trains" },
    { id: 20, name: "Problems on H.C.F and L.C.M" },
    { id: 21, name: "Simplification" },
  ];

  return (
    <div className="container py-2">
      <div className="mb-1">
        <button
          className="btn back-btn d-flex align-items-center gap-2 shadow-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      <div className="text-center mb-5">
        <h2 className="fw-bold mb-2 heading-text">Arithmetic Aptitude</h2>
        <p className="text-muted">
          Master your numerical and analytical reasoning skills with topic-based quizzes
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

export default ArithmeticAptitude;
