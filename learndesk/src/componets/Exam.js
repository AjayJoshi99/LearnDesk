import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "./ExamData.json";
import "./styles/Exam.css";
import Timer from "./Timer";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArrowLeft } from "lucide-react";

function Exam() {
  const { num } = useParams();
  const [showResults, setShowResults] = useState(false);
  const [totalMarks, setTotalMarks] = useState(0);
  const [userAnswer, setUserAnswer] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
  });

  const obj = data.find((exam) => exam.e === num);
  const quizName = `Quiz-${num}`;
  const navigate = useNavigate();

  // ✅ Disable right-click and text copy
  useEffect(() => {
    const disableCopy = (e) => e.preventDefault();
    const disableRightClick = (e) => e.preventDefault();
    const disableSelect = (e) => e.preventDefault();

    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("copy", disableCopy);
    document.addEventListener("cut", disableCopy);
    document.addEventListener("paste", disableCopy);
    document.addEventListener("selectstart", disableSelect);

    // Cleanup when component unmounts
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("copy", disableCopy);
      document.removeEventListener("cut", disableCopy);
      document.removeEventListener("paste", disableCopy);
      document.removeEventListener("selectstart", disableSelect);
    };
  }, []);

  // ✅ Detect tab switch or minimize
  useEffect(() => {
    const handleTabSwitch = () => {
      if (document.hidden) {
        alert("Tab switched! Quiz will be submitted automatically.");
        handleTimeUp();
      }
    };

    document.addEventListener("visibilitychange", handleTabSwitch);

    return () => {
      document.removeEventListener("visibilitychange", handleTabSwitch);
    };
  });

  const checkAnswer = (ipt, ans, ind) => {
    const updatedAnswers = { ...userAnswer, [ind]: ipt };
    setUserAnswer(updatedAnswers);
    if (ipt === ans) {
      setTotalMarks((totalMarks) => totalMarks + 1);
    }
  };

  const handleTimeUp = async () => {
    if (showResults) return; // prevent multiple submissions
    setShowResults(true);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("User not logged in!");
      return;
    }

    const resultData = {
      email: user.email,
      quizNumber: num,
      quizName: quizName,
      totalMarks,
      answers: userAnswer,
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/save-quiz`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resultData),
        }
      );
      const data = await res.json();
      console.log("Saved quiz:", data);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  return (
    <div
      className="exam-container"
      // inline style for extra security
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
      }}
    >
      <div className="text-start mb-3">
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} className="me-2" /> Back
        </button>
      </div>

      {!showResults ? (
        <>
          <Timer onTimeUp={handleTimeUp} />
          {obj.Question.map((que, index) => (
            <div className="card border rounded m-3 p-2 shadow-lg" key={index}>
              <div className="card-body">
                <p className="card-text b">
                  Question {index + 1}: {que[0]}
                </p>
                {[1, 2, 3, 4].map((opt) => (
                  <div className="form-check" key={opt}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`answer-${index + 1}`}
                      onChange={() => checkAnswer(que[opt], que[5], index + 1)}
                    />
                    <label className="form-check-label">
                      {que[opt]}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleTimeUp} className="btn btn-success rounded">
            Submit
          </button>
        </>
      ) : (
        <div className="">
          <div className="text-center">
            <h2 className="mx-auto">Quiz Results</h2>
            <h3>Total Marks: {totalMarks}</h3>
          </div>
          {obj.Question.map((que, index) => (
            <div className="card border rounded m-3 p-2 shadow-lg" key={index}>
              {userAnswer[index + 1] === que[5] ? (
                <h3 style={{ color: "green" }}>Correct</h3>
              ) : (
                <h3 style={{ color: "red" }}>Incorrect</h3>
              )}
              <p className="card-text">
                <span className="h5">Question {index + 1}: </span>
                {que[0]}
              </p>
              <div>
                <div>A. {que[1]}</div>
                <div>B. {que[2]}</div>
                <div>C. {que[3]}</div>
                <div>D. {que[4]}</div>
              </div>
              <hr />
              <div>Your Answer: {userAnswer[index + 1]}</div>
              <div>Correct Answer: {que[5]}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Exam;
