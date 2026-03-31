
const express = require("express");
const {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
} = require("../controllers/Management/expenseController");

const {auth,isStudent, isAdmin}  = require("../middlewares/auth");

const router = express.Router();

// Add new expense
router.post("/", auth, isAdmin,createExpense);

// Get all expenses
router.get("/viewAllExpenses", auth, isAdmin, getAllExpenses);

// Get expense by ID
router.get("/:id", auth, isAdmin, getExpenseById);

// Update expense
router.put("/:id", auth, isAdmin, updateExpense);

// Delete expense
router.delete("/:id",   auth, isAdmin, deleteExpense);

module.exports = router;
