const mongoose = require("mongoose");

const scheduledExamSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  classCode: { type: String, required: true },
  teacherEmail: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ScheduledExam", scheduledExamSchema);
