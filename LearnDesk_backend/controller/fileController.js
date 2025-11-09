const File = require("../models/File");
const path = require("path");
const fs = require("fs");    

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { classCode, teacherEmail } = req.body;
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const newFile = new File({
      filename: req.file.originalname,
      url: fileUrl,
      mimeType: req.file.mimetype,
      size: req.file.size,
      classCode,
      teacherEmail,
    });

    await newFile.save();

    res.status(200).json({ message: "File uploaded successfully", file: newFile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "File upload failed" });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const { classCode, teacherEmail } = req.params;
    const files = await File.find({ classCode, teacherEmail }).sort({ uploadedAt: -1 });
    res.status(200).json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch files" });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    const filePath = path.join(process.cwd(), "uploads", path.basename(file.url));

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await File.findByIdAndDelete(id);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete file" });
  }
};

exports.getFilesByClass = async (req, res) => {
  try {
    const { classCode } = req.params;
    const files = await File.find({ classCode }).sort({ createdAt: -1 });
    res.status(200).json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch files for this class" });
  }
};