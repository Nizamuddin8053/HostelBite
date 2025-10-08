
const db = require("../../config/Database");

// Create salary record
exports.createSalary = (req, res) => {
    const { staff_id, amount, month, status } = req.body;

    if (!staff_id || !amount || !month) {
        return res.status(400).json({ error: "Staff ID, amount, and month are required" });
    }

    const sql = "INSERT INTO salaries (staff_id, amount, month, status) VALUES (?, ?, ?, ?)";
    db.query(sql, [staff_id, amount, month, status || "pending"], (err, result) => {
        if (err) {
            console.error("Error inserting salary:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Salary record created successfully", salaryId: result.insertId });
    });
};

// Get all salaries
exports.getAllSalaries = (req, res) => {
    const sql = `
        SELECT s.id, s.amount, s.month, s.status, s.created_at, 
               st.name AS staff_name, st.role 
        FROM salaries s 
        JOIN staff st ON s.staff_id = st.id
        ORDER BY s.created_at DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching salaries:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
};

// Get salary by ID
exports.getSalaryById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM salaries WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching salary:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Salary record not found" });
        }
        res.status(200).json(result[0]);
    });
};

// Get salaries by staff
exports.getSalariesByStaff = (req, res) => {
    const { staffId } = req.params;
    const sql = "SELECT * FROM salaries WHERE staff_id = ? ORDER BY created_at DESC";
    db.query(sql, [staffId], (err, results) => {
        if (err) {
            console.error("Error fetching staff salaries:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
};

// Update salary status (paid/pending)
exports.updateSalaryStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: "Status is required" });
    }

    const sql = "UPDATE salaries SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error("Error updating salary:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Salary record not found" });
        }
        res.status(200).json({ message: "Salary status updated successfully" });
    });
};

// Delete salary record
exports.deleteSalary = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM salaries WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting salary:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Salary record not found" });
        }
        res.status(200).json({ message: "Salary record deleted successfully" });
    });
};
