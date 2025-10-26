const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");
const Result = require("../models/Result");
const examController = require("../controller/examController");

router.post("/add", examController.createExam);
router.get("/teacher/:teacherEmail", examController.getExams);
router.put("/update/:examId", examController.updateExam);
router.get("/:examId", async (req, res) => {
  try {
    const { examId } = req.params;
    console.log("Fetching exam with ID at backend:", examId);
    if (!examId) return res.status(400).json({ message: "Exam ID is required" });

    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    res.status(200).json({ exam });
  } catch (err) {
    console.error("Error fetching exam:", err);
    res.status(500).json({ message: "Internal server error" });
  }});
router.get("/exams/:examId", async (req, res) => {  
  try {
    const { examId } = req.params;
    const { classCode } = req.query; // ✅ Get classCode from query params

    if (!examId) {
      return res.status(400).json({ message: "Exam ID is required" });
    }

    if (!classCode) {
      return res.status(400).json({ message: "Class code is required" });
    }

    // ✅ Find results matching both examId and classCode
    const results = await Result.find({ examId, classCode }).sort({ submittedAt: -1 });

    if (!results || results.length === 0) {
      return res.status(200).json({
        results: [],
        message: "No students have taken this exam yet for this class.",
      });
    }

    res.status(200).json({ results });
  } catch (err) {
    console.error("Error fetching results:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
