
const express = require("express");
const {
    createExpense,
    getAllExpenses,
    getMonthlyCategoryExpenses,
} = require("../controllers/Management/expenseController");



const router = express.Router();

// Add new expense
router.post("/create-expense", createExpense);

// Get all expenses
router.get("/viewAllExpenses", getAllExpenses);

// get category+monthly expense

router.get("/viewCategoryWiseMonthlyExpenses", getMonthlyCategoryExpenses);


module.exports = router;
