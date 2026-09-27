const express = require("express");
const router = express.Router();
const studentController = require("../controllers/Student/studentController");
const { isAdmin, isSelfOrAdmin } = require("../middlewares/auth");


// CRUD routes for students
router.get("/getAll", isAdmin, studentController.getAllStudents);
router.get("/search", isAdmin, studentController.searchStudents);
router.get("/:id", isSelfOrAdmin("id", undefined, "student"), studentController.getStudentById);
router.put("/:id", isAdmin, studentController.updateStudent);
router.delete("/deleteCourseYear", isAdmin, studentController.deleteByCourseAndYear);
router.delete("/:student_id", isAdmin, studentController.deleteStudent);

module.exports = router;
