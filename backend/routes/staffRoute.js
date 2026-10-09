// routes/staff.js
const express = require("express");
const {
    createStaff,
    getAllStaff,
    getMyStaffProfile,
    updateStaffSalary,
    deleteStaff,
    
} = require("../controllers/Staff/staffController");



const router = express.Router();
const { isAdmin, isStaff } = require("../middlewares/auth");

// Create staff
router.post("/", isAdmin, createStaff);

// Get all staff
router.get("/getAllStaff", isAdmin, getAllStaff);

// Get the signed-in staff member's own salary details
router.get("/me", isStaff, getMyStaffProfile);


// Update staff
router.put("/update-salary/:id", isAdmin, updateStaffSalary);


// Delete staff
router.delete("/:id", isAdmin, deleteStaff);






module.exports = router;
