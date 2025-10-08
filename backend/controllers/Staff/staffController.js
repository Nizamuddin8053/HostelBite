
const db = require("../../config/Database");

// Create new staff
exports.createStaff = (req, res) => {
    const { name, email, phone, role, salary } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({ error: "Name, email, and role are required" });
    }

    const sql = "INSERT INTO staff (name, email, phone, role, salary) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, email, phone || null, role, salary || 0], (err, result) => {
        if (err) {
            console.error("Error inserting staff:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Staff added successfully", staffId: result.insertId });
    });
};

// Get all staff
exports.getAllStaff = (req, res) => {
    const sql = "SELECT * FROM staff ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching staff:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
};

// Get staff by ID
exports.getStaffById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM staff WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching staff:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Staff not found" });
        }
        res.status(200).json(result[0]);
    });
};

// Update staff details
exports.updateStaff = (req, res) => {
    const { id } = req.params;
    const { name, email, phone, role, salary } = req.body;

    const sql = "UPDATE staff SET name = ?, email = ?, phone = ?, role = ?, salary = ? WHERE id = ?";
    db.query(sql, [name, email, phone, role, salary, id], (err, result) => {
        if (err) {
            console.error("Error updating staff:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Staff not found" });
        }
        res.status(200).json({ message: "Staff updated successfully" });
    });
};

// Delete staff
exports.deleteStaff = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM staff WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting staff:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Staff not found" });
        }
        res.status(200).json({ message: "Staff deleted successfully" });
    });
};
