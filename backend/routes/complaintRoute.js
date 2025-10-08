// routes/complaintRoutes.js
const express = require("express");
const router = express.Router();
const {
    createComplaint,
    getAllComplaints,
    getComplaintById,
    updateComplaintStatus,
    deleteComplaint
} = require("../controllers/Student/complaintController");

// Create a new complaint
router.post("/", createComplaint);

// Get all complaints
router.get("/", getAllComplaints);

// Get a complaint by ID
router.get("/:id", getComplaintById);

// Update complaint status
router.put("/:id/status", updateComplaintStatus);

// Delete a complaint
router.delete("/:id", deleteComplaint);

module.exports = router;
