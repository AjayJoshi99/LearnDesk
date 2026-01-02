const ScheduledExam = require("../models/scheduledExamModel");
const Exam = require("../models/Exam");
const nodemailer = require("nodemailer");
const Class = require("../models/Class");


exports.scheduleExam = async (req, res) => {
  try {
    const { examId, classCode, teacherEmail, date, duration } = req.body;

    if (!examId || !classCode || !teacherEmail || !date || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const classData = await Class.findOne({ code: classCode });
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

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

    const studentEmails = classData.students || [];

    if (studentEmails.length === 0) {
      return res.status(201).json({
        message: "Exam scheduled successfully, but no students to notify",
        scheduledExam,
      });
    }

    const exam = await Exam.findById(examId);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const formattedDate = new Date(date).toLocaleString();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: studentEmails,
      subject: `Exam Scheduled: ${exam?.title || "Upcoming Exam"}`,
      html: `
        <h2>Exam Scheduled</h2>
        <p>Your exam has been scheduled. Please note the details below:</p>

        <p><strong>Exam Title:</strong> ${exam?.title || "N/A"}</p>
        <p><strong>Class:</strong> ${classData.className}</p>
        <p><strong>Date & Time:</strong> ${formattedDate}</p>
        <p><strong>Duration:</strong> ${duration} minutes</p>

        <br />
        <p>Please be on time and ensure a stable internet connection.</p>

        <p>Scheduled by: ${teacherEmail}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Exam scheduled and email sent to students successfully",
      scheduledExam,
    });

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
    const { classCode } = req.body;        

    if (!classCode) {
      return res.status(400).json({ message: "classCode is required" });
    }

    const scheduled = await ScheduledExam.find({
      teacherEmail: email,
      classCode: classCode
    }).select("examId");
    
    const scheduledExamIds = scheduled.map(s => s.examId);
    const exams = await Exam.find({
      teacherEmail: email,
      _id: { $nin: scheduledExamIds }
    }).select("title description");
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