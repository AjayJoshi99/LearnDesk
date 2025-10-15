const express = require("express");
const router = express.Router();
const examController = require("../controller/examController");

router.post("/add", examController.createExam);
router.get("/teacher/:teacherEmail", examController.getExams);
router.put("/update/:examId", examController.updateExam);
router.get("/:examId", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Exam ID is required" });

    const exam = await Exam.findById(id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    res.status(200).json({ exam });
  } catch (err) {
    console.error("Error fetching exam:", err);
    res.status(500).json({ message: "Internal server error" });
  }});

module.exports = router;
