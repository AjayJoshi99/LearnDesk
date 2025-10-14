const Announcement = require('../models/Announcement');
const Class = require("../models/Class");
const nodemailer = require("nodemailer");

exports.addAnnouncement = async (req, res) => {
  try {
    const { title, content, classCode, teacherEmail } = req.body;

    if (!title || !content || !classCode || !teacherEmail)
      return res.status(400).json({ message: "All fields are required" });

    // Find class before using classData
    const classData = await Class.findOne({ code: classCode });
    if (!classData)
      return res.status(404).json({ message: "Class not found" });

    // Create new announcement
    const announcement = new Announcement({
      title,
      content,
      classCode,
      teacherEmail,
    });
    await announcement.save();

    const studentEmails = classData.students || [];

    if (studentEmails.length === 0) {
      return res.status(201).json({
        message: "Announcement created, but no students found to notify",
        announcement,
      });
    }

    // Setup mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: studentEmails, 
      subject: `📢 New Announcement in ${classData.className}`,
      html: `
        <h2>${title}</h2>
        <p>${content}</p>
        <p><strong>Class Code:</strong> ${classCode}</p>
        <p>– From ${teacherEmail}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Announcement created and emails sent successfully",
      announcement,
    });
  } catch (err) {
    console.error("Error creating announcement:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAnnouncementsByClass = async (req, res) => {
  try {
    const { classCode } = req.params;
    const announcements = await Announcement.find({ classCode }).sort({ createdAt: -1 });
    res.status(200).json({ announcements });
  } catch (err) {
    console.error('Error fetching announcements:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    await Announcement.findByIdAndDelete(id);
    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (err) {
    console.error('Error deleting announcement:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
