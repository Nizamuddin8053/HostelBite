
const express = require("express");
const {
    createFeedback,
    getAllFeedback,
    getFeedbackByStudent,
} = require("../controllers/Student/feedbackController");

const router = express.Router();

// Add new feedback
router.post("/", createFeedback);

// Get all feedback
router.get("/getAll", getAllFeedback);

// Get feedback by student
router.get("/student/:student_id", getFeedbackByStudent);

// Delete feedback
// router.delete("/:id",  deleteFeedback);

module.exports = router;
