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
router.post("/complaint", createComplaint);

// Get all complaints
router.get("/", getAllComplaints);

// Get a complaint by ID
router.get("/complaint/:id", getComplaintById);

// Update complaint status
router.put("/:id/resolve", updateComplaintStatus);

// Delete a complaint
router.delete("/complaint/:id", deleteComplaint);

module.exports = router;
