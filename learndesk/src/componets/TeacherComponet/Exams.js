import React, { useState, useEffect } from "react";
import { PlusCircle, Pencil, Save, XCircle } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const ExamTab = () => {
  const [exams, setExams] = useState([]);
  const [editingExam, setEditingExam] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });
  const [teacherEmail, setTeacherEmail] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setTeacherEmail(user?.email || "");
    fetchExams(user?.email);
  }, []);

  const fetchExams = async (email) => {
    if (!email) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/exam/teacher/${email}`);
      const data = await res.json();
      if (res.ok) setExams(data.exams || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateExam = async () => {
    if (!title.trim() || questions.length === 0)
      return alert("Title and at least one question required");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/exam/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, teacherEmail, questions }),
      });
      const data = await res.json();
      if (res.ok) {
        setExams([data.exam, ...exams]);
        clearForm();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (exam) => {
    setEditingExam(exam._id);
    setTitle(exam.title);
    setDescription(exam.description);
    setQuestions(exam.questions);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveEdit = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/exam/update/${editingExam}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, questions }),
      });
      const data = await res.json();
      if (res.ok) {
        setExams(exams.map((e) => (e._id === editingExam ? data.exam : e)));
        clearForm();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleAddNewQuestion = () => {
    const { questionText, options, correctAnswer } = newQuestion;
    if (!questionText.trim() || options.some((o) => !o.trim()) || !correctAnswer)
      return alert("Please fill all fields");
    setQuestions([...questions, newQuestion]);
    setNewQuestion({ questionText: "", options: ["", "", "", ""], correctAnswer: "" });
  };

  const clearForm = () => {
    setEditingExam(null);
    setTitle("");
    setDescription("");
    setQuestions([]);
    setNewQuestion({ questionText: "", options: ["", "", "", ""], correctAnswer: "" });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 p-4">
        <h4 className="mb-3 text-primary d-flex align-items-center">
          <PlusCircle size={22} className="me-2" />{" "}
          {editingExam ? "Edit Exam" : "Create New Exam"}
        </h4>

        {/* Exam Info */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Exam Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="form-control"
            placeholder="Exam Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Editable Questions */}
        {questions.length > 0 && (
          <div className="mt-3">
            <h5 className="text-secondary mb-3">Edit Questions</h5>
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="card border-0 shadow-sm mb-3 bg-light">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="text-primary fw-bold mb-0">
                      Question {qIndex + 1}
                    </h6>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteQuestion(qIndex)}
                    >
                      <XCircle size={14} /> Remove
                    </button>
                  </div>

                  <input
                    type="text"
                    className="form-control mb-3"
                    value={q.questionText}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, "questionText", e.target.value)
                    }
                  />

                  {/* Inline Options (A-D) */}
                  {["A", "B", "C", "D"].map((label, idx) => (
                    <div key={idx} className="row align-items-center mb-2">
                      <div className="col-md-3 col-4 text-muted small fw-bold">
                        Option {label}:
                      </div>
                      <div className="col-md-9 col-8">
                        <input
                          type="text"
                          className="form-control"
                          value={q.options[idx]}
                          onChange={(e) =>
                            handleOptionChange(qIndex, idx, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}

                  {/* Correct Answer */}
                  <div className="row align-items-center mt-3">
                    <div className="col-md-3 col-4 text-muted small fw-bold">
                      Correct Answer:
                    </div>
                    <div className="col-md-9 col-8">
                      <select
                        className="form-select"
                        value={q.correctAnswer}
                        onChange={(e) =>
                          handleQuestionChange(qIndex, "correctAnswer", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        {q.options.map((opt, idx) => (
                          <option key={idx} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Question Section */}
        <div className="mt-4">
          <h5 className="text-success mb-3">Add New Question</h5>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter question text"
            value={newQuestion.questionText}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, questionText: e.target.value })
            }
          />
          {["A", "B", "C", "D"].map((label, idx) => (
            <div key={idx} className="row align-items-center mb-2">
              <div className="col-md-3 col-4 text-muted small fw-bold">
                Option {label}:
              </div>
              <div className="col-md-9 col-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Option ${label}`}
                  value={newQuestion.options[idx]}
                  onChange={(e) => {
                    const updatedOpts = [...newQuestion.options];
                    updatedOpts[idx] = e.target.value;
                    setNewQuestion({ ...newQuestion, options: updatedOpts });
                  }}
                />
              </div>
            </div>
          ))}
          <div className="row align-items-center mt-3">
            <div className="col-md-3 col-4 text-muted small fw-bold">
              Correct Answer:
            </div>
            <div className="col-md-9 col-8">
              <select
                className="form-select"
                value={newQuestion.correctAnswer}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })
                }
              >
                <option value="">Select</option>
                {newQuestion.options.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            className="btn btn-success w-100 mt-3"
            onClick={handleAddNewQuestion}
          >
            <PlusCircle size={16} className="me-1" /> Add Question
          </button>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end mt-4">
          {editingExam ? (
            <>
              <button className="btn btn-primary me-2" onClick={handleSaveEdit}>
                <Save size={16} className="me-1" /> Save Changes
              </button>
              <button className="btn btn-secondary" onClick={clearForm}>
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleCreateExam}>
              Create Exam
            </button>
          )}
        </div>
      </div>

      {/* Exam List */}
      <hr className="my-4" />
      <h4 className="text-primary mb-3">Your Exams</h4>
      <div className="row">
        {exams.length === 0 ? (
          <p>No exams created yet.</p>
        ) : (
          exams.map((exam) => (
            <div key={exam._id} className="col-md-6 mb-3">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title">{exam.title}</h5>
                  <p className="card-text text-muted">{exam.description}</p>
                  <p className="text-muted">Questions: {exam.questions.length}</p>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleEditClick(exam)}
                  >
                    <Pencil size={14} /> Edit
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExamTab;
