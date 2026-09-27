
const express = require("express");
const {
    createExpense,
    getAllExpenses,
    getMonthlyCategoryExpenses,
} = require("../controllers/Management/expenseController");



const router = express.Router();
const { isAdmin } = require("../middlewares/auth");

// Add new expense
router.post("/create-expense", isAdmin, createExpense);

// Get all expenses
router.get("/viewAllExpenses", isAdmin, getAllExpenses);

// get category+monthly expense

router.get("/viewCategoryWiseMonthlyExpenses", isAdmin, getMonthlyCategoryExpenses);


module.exports = router;
