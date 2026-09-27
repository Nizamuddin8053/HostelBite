// routes/staff.js
const express = require("express");
const {
    createStaff,
    getAllStaff,
    updateStaffSalary,
    deleteStaff,
    
} = require("../controllers/Staff/staffController");



const router = express.Router();
const { isAdmin } = require("../middlewares/auth");

// Create staff
router.post("/", isAdmin, createStaff);

// Get all staff
router.get("/getAllStaff", isAdmin, getAllStaff);


// Update staff
router.put("/update-salary/:id", isAdmin, updateStaffSalary);


// Delete staff
router.delete("/:id", isAdmin, deleteStaff);






module.exports = router;
