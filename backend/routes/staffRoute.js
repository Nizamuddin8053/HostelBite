// routes/staff.js
const express = require("express");
const {
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaffSalary,
    deleteStaff,
    approveStaff,
    getUnapprovedStaff,
    checkApprove
} = require("../controllers/Staff/staffController");



const router = express.Router();

// Create staff
router.post("/",  createStaff);

// Get all staff
router.get("/getAllStaff",  getAllStaff);

// unapprove staff
router.get("/unapproved", getUnapprovedStaff);

router.post("/checkapprove", checkApprove);
// Update staff
router.put("/update-salary/:id",  updateStaffSalary);

// Get staff by ID
router.get("/:id",  getStaffById);


// Delete staff
router.delete("/:id",  deleteStaff);

// approve staff
router.put("/approve/:id", approveStaff);




module.exports = router;
