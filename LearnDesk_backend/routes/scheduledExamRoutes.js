const express = require("express");
const router = express.Router();
const {
  scheduleExam,
  getExamsByTeacher,
  deleteScheduledExam,
  getBaseExamsByTeacher,
  getExamsByClass
} = require("../controller/scheduledExamController");

router.post("/schedule", scheduleExam);
router.get("/teacher/:email", getExamsByTeacher);
router.delete("/:id", deleteScheduledExam);
router.get("/base/teacher/:email", getBaseExamsByTeacher);
router.get("/class/:classCode", getExamsByClass);


module.exports = router;
