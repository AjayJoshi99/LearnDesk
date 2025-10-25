const ScheduledExam = require("../models/scheduledExamModel");
const Exam = require("../models/Exam");

exports.scheduleExam = async (req, res) => {
  try {
    const { examId, classCode, teacherEmail, date, duration } = req.body;
    const scheduledExam = new ScheduledExam({
      examId,
      classCode,
      teacherEmail,
      date,
      duration,
    });
    await Exam.findByIdAndUpdate(
      examId,
      { $addToSet: { classCodes: classCode } },
      { new: true }
    );

    await scheduledExam.save();
    res.status(201).json({ message: "Exam scheduled successfully", scheduledExam });
  } catch (err) {
    console.error("Error scheduling exam:", err);
    res.status(500).json({ message: "Failed to schedule exam", error: err });
  }
};

exports.getExamsByTeacher = async (req, res) => {
  try {
    const { email } = req.params;

    const exams = await ScheduledExam.find({ teacherEmail: email })
      .populate("examId", "title description")
      .sort({ date: -1 });

    const now = new Date();
    const upcoming = exams.filter(e => new Date(e.date) > now);
    const completed = exams.filter(e => new Date(e.date) <= now);

    res.status(200).json({ upcoming, completed });
  } catch (err) {
    console.error("Error fetching exams:", err);
    res.status(500).json({ message: "Failed to fetch exams", error: err });
  }
};

exports.getBaseExamsByTeacher = async (req, res) => {
  try {
    const { email } = req.params;
    const exams = await Exam.find({ teacherEmail: email }).select("title description");

    if (!exams.length) {
      return res.status(200).json({ exams: [] });
    }

    res.status(200).json({ exams });
  } catch (err) {
    console.error("Error fetching base exams:", err);
    res.status(500).json({ message: "Failed to fetch exams", error: err });
  }
};

exports.deleteScheduledExam = async (req, res) => {
  try {
    const { id } = req.params;
    await ScheduledExam.findByIdAndDelete(id);
    res.status(200).json({ message: "Scheduled exam deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete scheduled exam", error: err });
  }
};

exports.getExamsByClass = async (req, res) => {
  try {
    const { classCode } = req.params;
    const exams = await ScheduledExam.find({ classCode })
      .populate("examId")
      .sort({ date: 1 });

    res.status(200).json({ exams });
  } catch (err) {
    console.error("Error fetching exams by class:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getExamsByTeacherAndClass = async (req, res) => {
  try {
    const { email, classCode } = req.params;

    const exams = await ScheduledExam.find({
      teacherEmail: email,
      classCode: classCode,
    })
      .populate("examId", "title description duration")
      .sort({ date: -1 });

    const now = new Date();
    const upcoming = exams.filter(e => new Date(e.date) > now);
    const completed = exams.filter(e => new Date(e.date) <= now);

    res.status(200).json({ upcoming, completed });
  } catch (err) {
    console.error("Error fetching exams:", err);
    res.status(500).json({ message: "Failed to fetch exams", error: err });
  }
};