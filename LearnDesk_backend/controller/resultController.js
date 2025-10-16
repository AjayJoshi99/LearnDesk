const Result = require("../models/Result");

// 🧾 Save student result
exports.saveResult = async (req, res) => {
  try {
    const { examId, classCode, userEmail, score, totalQuestions, duration, answers } = req.body;

    if (!examId || !userEmail)
      return res.status(400).json({ message: "Missing required fields" });

    const newResult = new Result({
      examId,
      classCode,
      userEmail,
      score,
      totalQuestions,
      duration,
      answers,
    });

    await newResult.save();
    res.status(201).json({ message: "Result saved successfully", result: newResult });
  } catch (error) {
    console.error("Error saving result:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📊 Fetch results for a specific user
exports.getUserResults = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const results = await Result.find({ userEmail }).populate("examId");
    res.status(200).json({ results });
  } catch (error) {
    console.error("Error fetching user results:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🏫 Fetch all results for a class (teacher view)
exports.getClassResults = async (req, res) => {
  try {
    const { classCode } = req.params;
    const results = await Result.find({ classCode }).populate("examId");
    res.status(200).json({ results });
  } catch (error) {
    console.error("Error fetching class results:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

