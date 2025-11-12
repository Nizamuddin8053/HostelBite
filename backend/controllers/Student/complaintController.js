// controllers/Complaint/complaintController.js
const pool = require("../../config/Database"); // require your database connection

// Create a new complaint
const createComplaint = (req, res) => {
    const { student_id, title, description } = req.body;
    if (!student_id || !title || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = "INSERT INTO complaints (title, description, status, submitted_at, student_id) VALUES (?, ?, ?, NOW(), ?)";
    pool.query(query, [title, description, 'Pending', student_id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: "Complaint submitted successfully", student_id: student_id });
    });
};

// Get all complaints
const getAllComplaints = (req, res) => {
    const query = "SELECT * FROM complaints ORDER BY submitted_at DESC";
    pool.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json(results);
    });
};

// Get complaint by ID
const getComplaintById = (req, res) => {
    const { id } = req.params; // student_id
    const query = "SELECT * FROM complaints WHERE student_id = ?";
    pool.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Complaint not found" });
        res.status(200).json({ complaints: results });
    });
};

// Update complaint status (e.g., Pending → Resolved)
const updateComplaintStatus = (req, res) => {
    const { complaint_id } = req.body;
    const { response } = req.body;
    if (!response) return res.status(400).json({ message: "Response is required" });

    const query = "UPDATE complaints SET status = ?, response = ?, responded_at = NOW() WHERE complaint_id = ?";
    pool.query(query, ['Resolved', response, complaint_id], (err, result) => {
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
