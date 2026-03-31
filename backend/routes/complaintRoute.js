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

const {auth,isStudent, isAdmin}  = require("../middlewares/auth");

// Create a new complaint
router.post("/complaint", auth, isStudent, createComplaint);

// Get all complaints
router.get("/", auth, isAdmin ,getAllComplaints);

// Get a complaint by ID
router.get("/complaint/:id",  getComplaintById);

// Update complaint status
router.put("/:id/resolve", auth, updateComplaintStatus);

// Delete a complaint
router.delete("/complaint/:id",  deleteComplaint);

module.exports = router;
