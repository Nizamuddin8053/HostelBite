const express = require("express");
const router = express.Router();
const studentController = require("../controllers/Student/studentController");

// CRUD routes for students
router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
