import { useParams, useLocation, useNavigate } from "react-router-dom";
import data from "./ExamData.json";
import { ArrowLeft } from "lucide-react";

function ReviewQuiz() {
  const { quizNumber } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const obj = data.find((exam) => exam.e === quizNumber);
  const quizResult = state?.quiz; 

  if (!obj || !quizResult) {
    return <h3>Quiz data not found</h3>;
  }

  const userAnswers = quizResult.answers;

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} className="me-2" /> Back
        </button>
      </div>

      <h2>{quizResult.quizName}</h2>
      <h4>Total Marks: {quizResult.totalMarks}</h4>

      {obj.Question.map((que, index) => {
        const userAns = userAnswers[index + 1];
        const correctAns = que[5];
        const isCorrect = userAns === correctAns;

        return (
          <div className="card p-3 m-3 shadow-sm" key={index}>
            <h5>
              Question {index + 1}: {que[0]}
            </h5>
            <div className="mt-2">
              {["A", "B", "C", "D"].map((opt, i) => {
                const optionValue = que[i + 1];
                const isUserSelected = optionValue === userAns;
                const isCorrectOption = optionValue === correctAns;

                let bgColor = "white";
                if (isUserSelected && isCorrectOption) bgColor = "#d4edda"; 
                else if (isUserSelected && !isCorrectOption) bgColor = "#f8d7da"; 
                else if (isCorrectOption) bgColor = "#cce5ff"; 
                return (
                  <div
                    key={opt}
                    className="p-2 m-1 border rounded"
                    style={{ backgroundColor: bgColor }}
                  >
                    {opt}. {optionValue}
                  </div>
                );
              })}
            </div>

            <p className="mt-2">
              Your Answer:{" "}
              <b style={{ color: isCorrect ? "green" : "red" }}>
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
  );
}

export default ReviewQuiz;
