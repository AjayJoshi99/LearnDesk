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

exports.addStudentToClass = async (req, res) => {
  try {
    const { email } = req.body;
    const classData = await Class.findOne({ code: req.params.code });
    if (!classData)
      return res.status(404).json({ message: "Class not found" });

    const teacher = await User.findOne({ email: classData.teacherEmail });
    const user = await User.findOne({ email });

    if (!teacher)
      return res.status(404).json({ message: "Teacher not found for this class" });

    // --- Case 1: Student not registered yet ---
    if (!user) {
      if (!classData.pendingStudents.includes(email)) {
        classData.pendingStudents.push(email);
        await classData.save();

        await sendMail({
          to: email,
          subject: `Invitation to join "${classData.className}" class on LearnDesk`,
          text: `Hello!\n\nYou have been invited by ${teacher.name} (${classData.teacherEmail}) to join the class "${classData.name}" on LearnDesk.\n\nTo get started, please register on LearnDesk using the link below:\n${process.env.FRONTEND_URL}/register\n\nWe look forward to having you in the class!\n\n- The LearnDesk Team`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color:#2b6cb0;">Invitation to Join Class</h2>
              <p>Hello,</p>
              <p><b>${teacher.name}</b> has invited you to join the class <b>${classData.name}</b> on <b>LearnDesk</b>.</p>
              <p>To get started, please create your account by clicking the link below:</p>
              <p><a href="${process.env.FRONTEND_URL}/" 
                    style="background-color:#2b6cb0;color:#fff;padding:10px 15px;border-radius:5px;text-decoration:none;">
                Register on LearnDesk
              </a></p>
              <p>We're excited to have you join and learn together!</p>
              <p>- The LearnDesk Team</p>
            </div>
          `,
        });
      }

      return res.json({
        message: "Student added to pending list (not registered yet). Email invitation sent.",
      });
    }

    // --- Case 2: Student already registered ---
    if (!classData.students.includes(email)) {
      classData.students.push(email);
      await classData.save();
      await sendMail({
        to: email,
        subject: `You’ve been added to the "${classData.className}" class by ${teacher.name}`,
        text: `Hello ${user.name || "Student"},\n\nGood news! You’ve been added to the class "${classData.name}" by ${teacher.name} on LearnDesk.\n\nYou can access your class and view materials by logging into your account:\n${process.env.FRONTEND_URL}/dashboard\n\nHappy Learning!\n\n- The LearnDesk Team`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color:#2b6cb0;">Welcome to ${classData.className}!</h2>
            <p>Hello ${user.name || "Student"},</p>
            <p>We’re happy to inform you that <b>${teacher.name}</b> has added you to their class <b>${classData.className}</b> on <b>LearnDesk</b>.</p>
            <p>You can now log in and access your class materials, quizzes, and announcements:</p>
            <p><a href="${process.env.FRONTEND_URL}/dashboard" 
                  style="background-color:#2b6cb0;color:#fff;padding:10px 15px;border-radius:5px;text-decoration:none;">
              Go to Dashboard
            </a></p><br/>Or&nbsp;
            <a href="https://deft-belekoy-46b208.netlify.app/">Click here to access your class</a>
            <p>We wish you a great learning experience!</p>
            <p>– The LearnDesk Team</p>
          </div>
        `,
      });
    }

    res.json({ message: "Student successfully added and notified via email." });
  } catch (err) {
    console.error("Error adding student:", err);
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
