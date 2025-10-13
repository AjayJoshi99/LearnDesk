const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: { type: String, required: true },
  subject: { type: String, required: true },
  code: { type: String, unique: true, required: true },
  teacherEmail: { type: String, required: true },
  students: [{ type: String }],
  pendingStudents: [{ type: String }], 
  createdAt: { type: Date, default: Date.now },
});

module.exports =  mongoose.model("Class", classSchema);
