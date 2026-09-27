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

const { isAdmin, isSelfOrAdmin } = require("../middlewares/auth");

const router = express.Router();

// Create new salary record
router.post("/", isAdmin, createSalary);

// Get all salaries
router.get("/", isAdmin, getAllSalaries);

// Get salary by ID
router.get("/:id", isAdmin, getSalaryById);

// Get salaries of a specific staff
router.get("/staff/:staffId", isSelfOrAdmin("staffId", undefined, "staff"), getSalariesByStaff);

// Update salary status
router.put("/:id/status", isAdmin, updateSalaryStatus);

// Delete salary record
router.delete("/:id", isAdmin, deleteSalary);

module.exports = router;
