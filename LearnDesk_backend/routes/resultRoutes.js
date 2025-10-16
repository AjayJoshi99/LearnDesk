const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const Exam = require("../models/Exam");
const resultController = require("../controller/resultController");

router.post("/save", resultController.saveResult);
router.get("/user/:userEmail", resultController.getUserResults);
router.get("/class/:classCode", resultController.getClassResults);
router.get("/check/:examId/:email", async (req, res) => {
  try {
    const { examId, email } = req.params;
    const existingResult = await Result.findOne({ examId, userEmail: email });
    res.json({ exists: !!existingResult });
  } catch (error) {
    console.error("Error checking result:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/get/:examId/:email", async (req, res) => {
  try {
    const { examId, email } = req.params;
    const result = await Result.findOne({ examId, userEmail: email }).populate("examId");

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching result:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/:examId/questions", async (req, res) => {
  try {
    const { examId } = req.params;
    if (!examId) return res.status(400).json({ message: "Exam ID is required" });
    const exam =await Exam.findById(req.params.examId).select("questions title");
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    const questions = exam.questions.map((q) => ({
      question: q.questionText,
      options: q.options,
      correctOption: q.options.indexOf(q.correctAnswer), 
    }));

    res.status(200).json({ examTitle: exam.title, questions });
  } catch (err) {
    console.error("Error fetching exam questions:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
