const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    mimeType: String,
    size: Number,
    classCode: String,
    teacherEmail: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
