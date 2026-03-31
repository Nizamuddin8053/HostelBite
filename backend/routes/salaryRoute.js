// routes/salary.js
const express = require("express");
const {
    createSalary,
    getAllSalaries,
    getSalaryById,
    getSalariesByStaff,
    updateSalaryStatus,
    deleteSalary
} = require("../controllers/Staff/salaryController");

const {auth,isStudent, isAdmin}  = require("../middlewares/auth");

const router = express.Router();

// Create new salary record
router.post("/", auth, isAdmin, createSalary);

// Get all salaries
router.get("/",  auth, isAdmin, getAllSalaries);

// Get salary by ID
router.get("/:id", getSalaryById);

// Get salaries of a specific staff
router.get("/staff/:staffId", getSalariesByStaff);

// Update salary status
router.put("/:id/status",  updateSalaryStatus);

// Delete salary record
router.delete("/:id",  deleteSalary);

module.exports = router;
