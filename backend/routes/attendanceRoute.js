const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/Student/attendanceController");

const {auth,isStudent, isAdmin}  = require("../middlewares/auth");

// CRUD routes for attendance
router.post("/mark", auth,isStudent,attendanceController.markAttendance);
router.get("/", attendanceController.getAllAttendance);
router.get("/student/:studentId", attendanceController.getAttendanceByStudent);
router.put("/:id",  attendanceController.updateAttendance);
router.delete("/:id", auth,isAdmin,attendanceController.deleteAttendance);

module.exports = router;
