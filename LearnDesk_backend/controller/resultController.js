const Result = require("../models/Result");
const Class = require("../models/Class");
const Exam = require("../models/Exam");
const Quiz = require("../models/Exam");

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

exports.getTeacherPerformance = async (req, res) => {
  try {
    const { teacherEmail } = req.params;
    if (!teacherEmail)
      return res.status(400).json({ message: "teacherEmail required" });

    const classes = await Class.find({ teacherEmail });
    if (!classes || classes.length === 0) {
      return res
        .status(404)
        .json({ message: "No classes found for this teacher" });
    }

    const classPerformance = [];

    for (const cls of classes) {
      const classCode = cls.code;

      // 1️⃣ Get students of this class (assuming stored in cls.students as array of emails)
      const allStudents = cls.students || [];

      // 2️⃣ Get all exams of this class
      const exams = await Exam.find({ classCodes: classCode });
      const examIds = exams.map((e) => e._id);

      // 3️⃣ Get all result documents for these exams & this class
      const results = await Result.find({
        examId: { $in: examIds },
        classCode,
      });

      // 4️⃣ Build student-level performance map (including zero-attempt students)
      const studentMap = {}; // email -> { scoreSum, possibleSum, attempts }

      // Initialize all class students with 0s
      for (const email of allStudents) {
        studentMap[email] = { scoreSum: 0, possibleSum: 0, attempts: 0 };
      }

      // Fill actual results
      let totalAttempts = 0;
      for (const r of results) {
        const email = r.userEmail;
        const score = Number(r.score) || 0;
        const possible = Number(r.totalQuestions) || 0;

        if (!studentMap[email])
          studentMap[email] = { scoreSum: 0, possibleSum: 0, attempts: 0 };

        studentMap[email].scoreSum += score;
        studentMap[email].possibleSum += possible;
        studentMap[email].attempts += 1;
        totalAttempts += 1;
      }

      // 5️⃣ Compute per-student averages (0% if no attempts)
      const studentEmails = Object.keys(studentMap);
      const totalStudents = studentEmails.length;

      const studentAverages = studentEmails.map((email) => {
        const s = studentMap[email];
        if (s.possibleSum > 0)
          return (s.scoreSum / s.possibleSum) * 100;
        else
          return 0; // student missed all exams
      });

      const classAvg =
        studentAverages.length > 0
          ? studentAverages.reduce((a, b) => a + b, 0) / studentAverages.length
          : 0;

      const topScore =
        studentAverages.length > 0 ? Math.max(...studentAverages) : 0;

      // 6️⃣ Per-exam performance (attempts, avg%, top%)
      const examPerformance = [];
      for (const exam of exams) {
        const examRes = results.filter(
          (r) => String(r.examId) === String(exam._id)
        );
        const examScores = examRes.map((r) => {
          const totalQ = Number(r.totalQuestions) || 0;
          return totalQ > 0 ? (r.score / totalQ) * 100 : 0;
        });

        const examAvg =
          examScores.length > 0
            ? examScores.reduce((a, b) => a + b, 0) / examScores.length
            : 0;
        const examTop = examScores.length > 0 ? Math.max(...examScores) : 0;

        examPerformance.push({
          examId: exam._id,
          title: exam.title,
          attempts: examRes.length,
          avgScore: Number(examAvg.toFixed(1)),
          topScore: Number(examTop.toFixed(1)),
        });
      }

      // 7️⃣ Push summary for this class
      classPerformance.push({
        className: cls.className,
        subject: cls.subject,
        classCode,
        avgScore: Number(classAvg.toFixed(1)),
        topScore: Number(topScore.toFixed(1)),
        totalStudents, // includes those who missed all exams
        totalAttempts,
        exams: examPerformance,
      });
    }

    return res.json({ teacherEmail, classPerformance });
  } catch (err) {
    console.error("Error in getTeacherPerformance:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};


exports.getStudentPerformance = async (req, res) => {
  try {
    const { studentEmail, classCode } = req.params;
    const email = studentEmail;
    // 1️⃣ Get all exams for the class
    const exams = await Exam.find({ classCodes: classCode });
    const examIds = exams.map((e) => e._id.toString());

    // 2️⃣ Get all results of this student for that class
    const results = await Result.find({ userEmail: email, classCode });

    // 3️⃣ Determine attempted and missed exams
    const attemptedExamIds = results.map((r) => r.examId.toString());
    const missedExams = exams.filter(
      (e) => !attemptedExamIds.includes(e._id.toString())
    );

    // 4️⃣ Calculate total score and accuracy
    let totalScore = 0;
    let totalQuestions = 0;

    results.forEach((r) => {
      totalScore += r.score;
      totalQuestions += r.totalQuestions;
    });

    const overallScore =
      totalQuestions > 0 ? ((totalScore / totalQuestions) * 100).toFixed(1) : 0;

    // 5️⃣ Prepare per-exam details
    const examDetails = results.map((r) => {
      const exam = exams.find((e) => e._id.toString() === r.examId.toString());
      return {
        examTitle: exam ? exam.title : "Unknown Exam",
        score: r.score,
        totalQuestions: r.totalQuestions,
        accuracy: ((r.score / r.totalQuestions) * 100).toFixed(1),
        submittedAt: r.submittedAt,
      };
    });

    // 6️⃣ Build summary response
    const summary = {
      totalQuizzes: exams.length,
      attemptedQuizzes: results.length,
      missedQuizzes: missedExams.length,
      overallScore,
      performanceList: examDetails,
    };

    res.status(200).json({ summary });
  } catch (err) {
    console.error("Error calculating student performance:", err);
    res.status(500).json({ message: "Server error calculating performance" });
  }
};