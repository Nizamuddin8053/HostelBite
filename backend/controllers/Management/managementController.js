
const db = require("../../config/Database");

// Create new management record
exports.createManagement = (req, res) => {
    const { name, email, phone, role } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({ error: "Name, email, and role are required" });
    }

    const sql = "INSERT INTO management (name, email, phone, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, phone || null, role], (err, result) => {
        if (err) {
            console.error("Error inserting management:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Management added successfully", managementId: result.insertId });
    });
};

// Get all management records
exports.getAllManagement = (req, res) => {
    const sql = "SELECT * FROM management ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching management:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
};

// Get management by ID
exports.getManagementById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM management WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching management:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Management record not found" });
        }
        res.status(200).json(result[0]);
    });
};

// Update management details
exports.updateManagement = (req, res) => {
    const { id } = req.params;
    const { name, email, phone, role } = req.body;

    const sql = "UPDATE management SET name = ?, email = ?, phone = ?, role = ? WHERE id = ?";
    db.query(sql, [name, email, phone, role, id], (err, result) => {
        if (err) {
            console.error("Error updating management:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Management record not found" });
        }
        res.status(200).json({ message: "Management updated successfully" });
    });
};

// Delete management record
exports.deleteManagement = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM management WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting management:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Management record not found" });
        }
        res.status(200).json({ message: "Management deleted successfully" });
    });
};
