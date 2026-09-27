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
const { isStudent, isStaffOrAdmin, isAdmin, isSelfOrAdmin } = require("../middlewares/auth");



// Create a new complaint
router.post("/complaint", isStudent, createComplaint);

// Get all complaints
router.get("/", isStaffOrAdmin, getAllComplaints);

// Get a complaint by ID
router.get("/complaint/:id", isSelfOrAdmin("id", undefined, "student"), getComplaintById);

// Update complaint status
router.put("/:id/resolve", isAdmin, updateComplaintStatus);

// Delete a complaint
router.delete("/complaint/:id", isAdmin, deleteComplaint);

module.exports = router;
