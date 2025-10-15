const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }], 
  correctAnswer: { type: String, required: true }, 
});

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  teacherEmail: { type: String, required: true },
  questions: [questionSchema], 
  createdAt: { type: Date, default: Date.now },
  classCodes: [{ type: String }], 
});

module.exports = mongoose.model("Exam", examSchema);
