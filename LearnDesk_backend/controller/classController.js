const Class = require("../models/Class");
const User = require('../models/User');
const { sendMail } = require('../utils/mailers');

exports.createClass = async (req, res) => {
  try {
    const { className, subject, teacherEmail } = req.body;

    const classCode = "CLS" + Math.floor(1000 + Math.random() * 9000);

    const newClass = new Class({
      className,
      subject,
      teacherEmail,
      code: classCode,
    });

    await newClass.save();
    res.status(201).json({ success: true, class: newClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getClassesByTeacher = async (req, res) => {
  try {
    const { email } = req.params;
    const classes = await Class.find({ teacherEmail: email });
    res.status(200).json({ success: true, classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const classData = await Class.findOne({code : req.params.id});
    if (!classData)
      return res.status(404).json({ message: "Class not found" });
    res.json(classData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching class", error });
  }
};


exports.getStudentsByClass = async (req, res) => {
  try {
    const { code } = req.params;

    const cls = await Class.findOne({ code });
    if (!cls) return res.status(404).json({ message: "Class not found" });
    // ✅ Registered students
    const registeredStudents = await User.find({ email: { $in: cls.students } })
      .select("name email mobile");

    const registered = registeredStudents.map((s) => ({
      name: s.name,
      email: s.email,
      mobile: s.mobile,
      status: "Joined",
    }));

    // ✅ Pending students (emails only)
    const pending = cls.pendingStudents.map((email) => ({
      name: "-",
      email,
      mobile: "-",
      status: "Pending",
    }));

    // ✅ Return both arrays
    res.json({ students: registered, pendingStudents: pending });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching students", error: err });
  }
};

// Add student to a class
exports.addStudentToClass = async (req, res) => {
  try {
    const { email } = req.body;
    const classData = await Class.findOne({ code: req.params.code });
    if (!classData) return res.status(404).json({ message: "Class not found" });

    const user = await User.findOne({ email });

    if (!user) {
      // Student not registered yet
      if (!classData.pendingStudents.includes(email)) {
        classData.pendingStudents.push(email);
        await classData.save();
        await sendMail({
        to: email,
        subject: `You are invited to join class ${classData.name}`,
        text: `Hello! You have been invited to join the class "${classData.name}" on LearnDesk. Please register to join: ${process.env.FRONTEND_URL}/register`,
        html: `<p>Hello! You have been invited to join the class "<b>${classData.name}</b>" on LearnDesk.</p>
              <p>Please register to join: <a href="${process.env.FRONTEND_URL}/">${process.env.FRONTEND_URL}/register</a></p>`,
      });
      }
      return res.json({
        message: "Student added to pending list (not registered yet)",
      });
    }

    // Student registered
    if (!classData.students.includes(email)) {
      classData.students.push(email);
      await classData.save();
    }

    res.json({ message: "Student successfully added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding student", error: err });
  }
};

exports.removeStudentFromClass = async (req, res) => {
  try {
    const { code } = req.params;
    const { email } = req.body;

    const cls = await Class.findOne({ code });
    if (!cls) return res.status(404).json({ message: "Class not found" });

    cls.students = cls.students.filter((e) => e !== email);
    cls.pendingStudents = cls.pendingStudents.filter((e) => e !== email);

    await cls.save();
    res.json({ message: "Student removed from class" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error removing student", error: err });
  }
};

exports.joinClass = async (req, res) => {
  try {
    const { classCode, email } = req.body;

    const classData = await Class.findOne({ code: classCode });
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Check if student is already added
    if (classData.students.includes(email)) {
      return res.status(200).json({ message: "Already joined this class", class: classData });
    }

    // If pending, mark as joined
    if (classData.pendingStudents.includes(email)) {
      classData.pendingStudents = classData.pendingStudents.filter(e => e !== email);
      classData.students.push(email);
    } else {
      // Add directly as student
      classData.students.push(email);
    }

    await classData.save();

    return res.status(200).json({
      message: "Successfully joined the class",
      class: classData
    });
  } catch (err) {
    console.error("Error joining class:", err);
    res.status(500).json({ message: "Error joining class", error: err });
  }
};

exports.getClassesByStudent = async (req, res) => {
  try {
    const { email } = req.params;

    // Find classes where the student's email is in `students`
    const classes = await Class.find({ students: email }).select(
      "className subject code teacherEmail"
    );

    // For each class, fetch the teacher's name
    const classesWithTeacher = await Promise.all(
      classes.map(async (cls) => {
        const teacher = await User.findOne({ email: cls.teacherEmail }).select(
          "name"
        );
        return {
          className: cls.className,
          subject: cls.subject,
          code: cls.code,
          teacherEmail: cls.teacherEmail,
          teacherName: teacher ? teacher.name : "Unknown",
        };
      })
    );

    res.status(200).json({ classes: classesWithTeacher });
  } catch (err) {
    console.error("Error fetching student classes:", err);
    res.status(500).json({ message: "Error fetching classes", error: err });
  }
};
