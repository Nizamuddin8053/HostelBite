
const db = require("../../config/Database");

// Add new expense
exports.createExpense = (req, res) => {
    const { title, category, date, description, qty, rate_kg, amount, management_id } = req.body;

    if (!title || !qty || !rate_kg || !category || !date) {
        return res.status(400).json({ error: "Title, quantity, rate per kg, category, and date are required" });
    }

    const sql = "INSERT INTO expenses (category, amount, date, description, management_id, title, qty, rate_kg) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [category, rate_kg*qty, date, description || null, management_id, title, qty, rate_kg], (err, result) => {
        if (err) {
            console.error("Error inserting expense:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Expense added successfully", expenseId: result.insertId });
    });
};

// Get all expenses
exports.getAllExpenses = (req, res) => {
    const allExpensesSql = "SELECT * FROM expenses ORDER BY date DESC";
    const totalAmountSql = "SELECT SUM(amount) AS totalAmount FROM expenses";
    const categoryBreakdownSql = "SELECT category, SUM(amount) AS categoryTotal FROM expenses GROUP BY category";

    db.query(allExpensesSql, (err, expenses) => {
        if (err) {
            console.error("Error fetching expenses:", err);
            return res.status(500).json({ error: "Database error while fetching expenses" });
        }

        db.query(totalAmountSql, (err, totalResult) => {
            if (err) {
                console.error("Error fetching total amount:", err);
                return res.status(500).json({ error: "Database error while fetching total amount" });
            }

            db.query(categoryBreakdownSql, (err, categoryResults) => {
                if (err) {
                    console.error("Error fetching category breakdown:", err);
                    return res.status(500).json({ error: "Database error while fetching category breakdown" });
                }

                res.status(200).json({
                    expenses,
                    totalAmount: totalResult[0]?.totalAmount || 0,
                    categoryBreakdown: categoryResults
                });
            });
        });
    });
};


// Get expense by ID
exports.getExpenseById = (req, res) => {
    const { expense_id } = req.body;
    const sql = "SELECT * FROM expenses WHERE expense_id = ?";
    db.query(sql, [expense_id], (err, result) => {
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
