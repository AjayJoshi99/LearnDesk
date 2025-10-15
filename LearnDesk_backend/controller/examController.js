const Exam = require("../models/Exam");

exports.createExam = async (req, res) => {
  try {
    const { title, description, teacherEmail, questions } = req.body;

    if (!title || !teacherEmail || !questions || questions.length === 0)
      return res.status(400).json({ message: "All fields are required" });

    const exam = new Exam({ title, description, teacherEmail, questions });
    await exam.save();
    res.status(201).json({ message: "Exam created", exam });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getExams = async (req, res) => {
  try {
    const { teacherEmail } = req.params;
    const exams = await Exam.find({ teacherEmail });
    res.status(200).json({ exams });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const { title, description, questions } = req.body;

    const exam = await Exam.findByIdAndUpdate(
      examId,
      { title, description, questions },
      { new: true }
    );

    if (!exam) return res.status(404).json({ message: "Exam not found" });

    res.status(200).json({ message: "Exam updated", exam });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
