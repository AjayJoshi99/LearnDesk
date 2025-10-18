const express = require('express');
const UserQuiz = require('../models/UserQuiz');

const router = express.Router();

router.post("/save-quiz", async (req, res) => {
  try {
    const { email, quizNumber, quizName, totalMarks, answers } = req.body;
    let user = await UserQuiz.findOne({ email });

    if (!user) {
      user = new UserQuiz({ email, quizHistory: [] });
    }

    user.quizHistory.push({
      quizNumber,
      quizName,
      totalMarks,
      answers: new Map(Object.entries(answers))
    });

    await user.save();

    res.status(200).json({ message: "Quiz result saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save quiz result" });
  }
});

router.get("/history/:email", async (req, res) => {
  try {
    const user = await UserQuiz.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json(user.quizHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch quiz history" });
  }
});

module.exports = router;
