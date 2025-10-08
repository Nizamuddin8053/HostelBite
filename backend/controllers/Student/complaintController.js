// controllers/Complaint/complaintController.js
const pool = require("../../config/Database"); // require your database connection

// Create a new complaint
const createComplaint = (req, res) => {
    const { user_id, title, description } = req.body;
    if (!user_id || !title || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = "INSERT INTO complaints (user_id, title, description, status, created_at) VALUES (?, ?, ?, 'Pending', NOW())";
    pool.query(query, [user_id, title, description], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: "Complaint submitted successfully", complaintId: result.insertId });
    });
};

// Get all complaints
const getAllComplaints = (req, res) => {
    const query = "SELECT * FROM complaints ORDER BY created_at DESC";
    pool.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json(results);
    });
};

// Get complaint by ID
const getComplaintById = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM complaints WHERE id = ?";
    pool.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Complaint not found" });
        res.status(200).json(results[0]);
    });
};

// Update complaint status (e.g., Pending → Resolved)
const updateComplaintStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });

    const query = "UPDATE complaints SET status = ? WHERE id = ?";
    pool.query(query, [status, id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Complaint not found" });
        res.status(200).json({ message: "Complaint status updated successfully" });
    });
};

// Delete a complaint
const deleteComplaint = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM complaints WHERE id = ?";
    pool.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Complaint not found" });
        res.status(200).json({ message: "Complaint deleted successfully" });
    });
};

module.exports = {
    createComplaint,
    getAllComplaints,
    getComplaintById,
    updateComplaintStatus,
    deleteComplaint
};
