const express = require("express");
const router = express.Router();
const studentController = require("../controllers/Student/studentController");

const {auth,isStudent, isAdmin}  = require("../middlewares/auth");

// CRUD routes for students
router.get("/getAll", auth, isAdmin, studentController.getAllStudents);
router.get("/:id",  auth, studentController.getStudentById);
router.put("/:id",  auth, isAdmin, studentController.updateStudent);
router.delete("/deleteCourseYear",  auth, isAdmin, studentController.deleteByCourseAndYear);
router.delete("/:student_id",  auth, isAdmin, studentController.deleteStudent);

module.exports = router;
