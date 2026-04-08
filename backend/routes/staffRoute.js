// routes/staff.js
const express = require("express");
const {
    createStaff,
    getAllStaff,
    updateStaffSalary,
    deleteStaff,
    
} = require("../controllers/Staff/staffController");



const router = express.Router();

// Create staff
router.post("/",  createStaff);

// Get all staff
router.get("/getAllStaff",  getAllStaff);


// Update staff
router.put("/update-salary/:id",  updateStaffSalary);


// Delete staff
router.delete("/:id",  deleteStaff);






module.exports = router;
