
const express = require("express");
const {
    createFeedback,
    getAllFeedback,
    getFeedbackByStudent,
    deleteFeedback
} = require("../controllers/Student/feedbackController");

const router = express.Router();

// Add new feedback
router.post("/", createFeedback);

// Get all feedback
router.get("/", getAllFeedback);

// Get feedback by student
router.get("/student/:studentId", getFeedbackByStudent);

// Delete feedback
router.delete("/:id", deleteFeedback);

module.exports = router;
