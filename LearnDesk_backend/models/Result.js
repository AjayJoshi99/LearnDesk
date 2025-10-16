const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  classCode: { type: String, required: true },
  userEmail: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  duration: { type: Number, default: 0 }, // in seconds
  answers: [
    {
      questionText: String,
      selectedOption: String,
      correctAnswer: String,
      isCorrect: Boolean,
    },
  ],
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", resultSchema);
