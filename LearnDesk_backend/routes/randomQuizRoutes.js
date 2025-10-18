const express = require("express");
const router = express.Router();
const RandomQuiz = require("../models/RandomQuiz");

router.post("/save", async (req, res) => {
  try {
    const { email, quizName, questions, totalMarks } = req.body;
    if (!email || !quizName || !questions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newQuiz = new RandomQuiz({
      email,
      quizName,
      questions,
      totalMarks,
    });

    await newQuiz.save();
    res.status(200).json({ message: "Quiz saved successfully" });
  } catch (err) {
    console.error("Error saving random quiz:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all quizzes for a user
router.get("/history/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const quizzes = await RandomQuiz.find({ email }).sort({ date: -1 });
    res.json(quizzes);
  } catch (err) {
    console.error("Error fetching quiz history:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
