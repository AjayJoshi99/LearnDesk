const express = require("express");
const { createClass, getClassesByTeacher, getClassById, addStudentToClass, removeStudentFromClass, getStudentsByClass} = require("../controller/classController");
const { joinClass, getClassesByStudent, updateClassDetails, deleteClass } = require("../controller/classController");

const router = express.Router();

router.post("/create", createClass);
router.get("/teacher/:email", getClassesByTeacher);
router.get("/:id", getClassById);
router.post("/:code/add-student", addStudentToClass);
router.post("/:code/remove-student", removeStudentFromClass);
router.get("/:code/students", getStudentsByClass);
router.post("/join", joinClass);
router.get("/student/:email", getClassesByStudent);
router.put("/update/:code", updateClassDetails);
router.delete("/delete/:code", deleteClass);
module.exports = router;  
