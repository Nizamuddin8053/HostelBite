const express = require("express");
const router = express.Router();
const studentController = require("../controllers/Student/studentController");

// CRUD routes for students
router.get("/getAll", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.put("/:id", studentController.updateStudent);
router.delete("/deleteCourseYear", studentController.deleteByCourseAndYear);
router.delete("/:student_id", studentController.deleteStudent);

module.exports = router;
