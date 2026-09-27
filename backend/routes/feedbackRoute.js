
const express = require("express");
const {
    createFeedback,
    getAllFeedback,
    getFeedbackByStudent,
} = require("../controllers/Student/feedbackController");
const { isStudent, isStaffOrAdmin, isSelfOrAdmin } = require("../middlewares/auth");

const router = express.Router();

// Add new feedback
router.post("/", isStudent, createFeedback);

// Get all feedback
router.get("/getAll", isStaffOrAdmin, getAllFeedback);

// Get feedback by student
router.get("/student/:student_id", isSelfOrAdmin("student_id", undefined, "student"), getFeedbackByStudent);

// Delete feedback
// router.delete("/:id",  deleteFeedback);

module.exports = router;
