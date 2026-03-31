// routes/staff.js
const express = require("express");
const {
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaff,
    deleteStaff
} = require("../controllers/Staff/staffController");

const {auth,isStudent, isAdmin}  = require("../middlewares/auth");

const router = express.Router();

// Create staff
router.post("/", auth, isAdmin, createStaff);

// Get all staff
router.get("/", auth, isAdmin, getAllStaff);

// Get staff by ID
router.get("/:id",  getStaffById);

// Update staff
router.put("/:id",  updateStaff);

// Delete staff
router.delete("/:id",  deleteStaff);

module.exports = router;
