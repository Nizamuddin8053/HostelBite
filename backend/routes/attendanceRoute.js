const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/Student/attendanceController");


// CRUD routes for attendance
router.post("/mark", attendanceController.markAttendance);
router.get("/", attendanceController.getAllAttendance);
router.get("/student/:student_id", attendanceController.getAttendanceByStudent);
// router.put("/:id",  attendanceController.updateAttendance);
// router.delete("/:id",attendanceController.deleteAttendance);

module.exports = router;
