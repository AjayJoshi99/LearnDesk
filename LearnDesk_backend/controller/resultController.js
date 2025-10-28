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


exports.getUserPerformance = async (req, res) => {
  try {
    const { userEmail, classCode } = req.params;

    const results = await Result.find({ userEmail, classCode });
    if (!results.length)
      return res.status(404).json({ message: "No performance data found" });

    const performanceData = results.map((r, i) => ({
      quiz: `Quiz ${i + 1}`,
      score: (r.score / r.totalQuestions) * 100,
      accuracy: ((r.score / r.totalQuestions) * 100).toFixed(2),
      avgTime: r.duration > 0 ? (r.duration / r.totalQuestions).toFixed(2) : 0,
    }));

    const overallScore =
      performanceData.reduce((a, b) => a + b.score, 0) / performanceData.length;
    const avgAccuracy =
      performanceData.reduce((a, b) => a + parseFloat(b.accuracy), 0) /
      performanceData.length;
    const avgTime =
      performanceData.reduce((a, b) => a + parseFloat(b.avgTime), 0) /
      performanceData.length;

    const classResults = await Result.find({ classCode });
    const percentages = classResults.map(
      (r) => (r.score / r.totalQuestions) * 100
    );

    const classAvg =
      percentages.reduce((a, b) => a + b, 0) / percentages.length;
    const topper = Math.max(...percentages);
    const betterThan =
      (percentages.filter((p) => p < overallScore).length / percentages.length) *
      100;

    res.json({
      performanceData,
      summary: {
        overallScore: overallScore.toFixed(1),
        avgAccuracy: avgAccuracy.toFixed(1),
        avgTime: avgTime.toFixed(1),
      },
      classComparison: {
        classAvg: classAvg.toFixed(1),
        topper: topper.toFixed(1),
        betterThan: betterThan.toFixed(1),
      },
    });
  } catch (err) {
    console.error("Error fetching performance:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getClassResults = async (req, res) => {
  try {
    const { classCode } = req.params;
    const results = await Result.find({ classCode }).sort({ submittedAt: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};