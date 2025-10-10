const mongoose = require("mongoose");

const userQuizSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // unique user identifier

  quizHistory: [
    {
      quizNumber: Number,
      quizName: String,
      totalMarks: Number,
      answers: { type: Map, of: String },
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("UserQuiz", userQuizSchema);
