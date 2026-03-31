
const express = require("express");
const {
    createFeedback,
    getAllFeedback,
    getFeedbackByStudent,
    deleteFeedback
} = require("../controllers/Student/feedbackController");

const {auth,isStudent, isAdmin}  = require("../middlewares/auth");

const router = express.Router();

// Add new feedback
router.post("/",  auth, isStudent, createFeedback);

// Get all feedback
router.get("/getAll",  auth,isAdmin,getAllFeedback);

// Get feedback by student
router.get("/student/:studentId", getFeedbackByStudent);

// Delete feedback
router.delete("/:id",  deleteFeedback);

module.exports = router;
