
const db = require("../../config/Database");

// Add new expense
exports.createExpense = (req, res) => {
    const { title, amount, category, date, description } = req.body;

    if (!title || !amount || !category || !date) {
        return res.status(400).json({ error: "Title, amount, category, and date are required" });
    }

    const sql = "INSERT INTO expenses (title, amount, category, date, description) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [title, amount, category, date, description || null], (err, result) => {
        if (err) {
            console.error("Error inserting expense:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Expense added successfully", expenseId: result.insertId });
    });
};

// Get all expenses
exports.getAllExpenses = (req, res) => {
    const sql = "SELECT * FROM expenses ORDER BY date DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching expenses:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
};

// Get expense by ID
exports.getExpenseById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM expenses WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching expense:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.status(200).json(result[0]);
    });
};

// Update expense
exports.updateExpense = (req, res) => {
    const { id } = req.params;
    const { title, amount, category, date, description } = req.body;

    const sql = "UPDATE expenses SET title = ?, amount = ?, category = ?, date = ?, description = ? WHERE id = ?";
    db.query(sql, [title, amount, category, date, description || null, id], (err, result) => {
        if (err) {
            console.error("Error updating expense:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.status(200).json({ message: "Expense updated successfully" });
    });
};

// Delete expense
exports.deleteExpense = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM expenses WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting expense:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.status(200).json({ message: "Expense deleted successfully" });
    });
};
