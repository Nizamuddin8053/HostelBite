
const express = require("express");
const {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
} = require("../controllers/Management/expenseController");

const router = express.Router();

// Add new expense
router.post("/", createExpense);

// Get all expenses
router.get("/viewAllExpenses", getAllExpenses);

// Get expense by ID
router.get("/:id", getExpenseById);

// Update expense
router.put("/:id", updateExpense);

// Delete expense
router.delete("/:id", deleteExpense);

module.exports = router;
