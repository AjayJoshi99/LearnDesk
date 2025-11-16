const express = require("express");
const router = express.Router();
const {
  scheduleExam,
  getExamsByTeacher,
  deleteScheduledExam,
  getBaseExamsByTeacher,
  getExamsByClass, 
  getExamsByTeacherAndClass
} = require("../controller/scheduledExamController");

router.post("/schedule", scheduleExam);
router.get("/teacher/:email", getExamsByTeacher);
router.delete("/:id", deleteScheduledExam);
router.post("/base/teacher/:email", getBaseExamsByTeacher);
router.get("/class/:classCode", getExamsByClass);
router.get("/teacher/:email/class/:classCode", getExamsByTeacherAndClass);

module.exports = router;
