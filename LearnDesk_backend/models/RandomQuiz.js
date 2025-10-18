const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correct_answer: String,
  user_answer: String,
});

const randomQuizSchema = new mongoose.Schema({
  email: { type: String, required: true },
  quizName: { type: String, required: true },
  questions: [questionSchema],
  totalMarks: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RandomQuiz", randomQuizSchema);
