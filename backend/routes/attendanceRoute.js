const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/Student/attendanceController");
const { isAdmin, isStudent, isStaffOrAdmin, isSelfOrAdmin } = require("../middlewares/auth");


router.post("/qr", isAdmin, attendanceController.createQrSession);
router.post("/mark", isStudent, attendanceController.markAttendance);
router.get("/", isStaffOrAdmin, attendanceController.getAllAttendance);
router.get("/me", isStudent, attendanceController.getMyAttendance);
router.get("/student/:student_id", isSelfOrAdmin("student_id", undefined, "student"), attendanceController.getAttendanceByStudent);
// router.put("/:id",  attendanceController.updateAttendance);
// router.delete("/:id",attendanceController.deleteAttendance);

module.exports = router;
