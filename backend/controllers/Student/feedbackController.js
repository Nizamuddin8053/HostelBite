
const db = require("../../config/Database");

// Add new feedback
exports.createFeedback = (req, res) => {
    const { student_id, message, rating } = req.body;

    if (!student_id || !message) {
        return res.status(400).json({ error: "Student ID and message are required" });
    }

    const sql = "INSERT INTO feedback (student_id, message, rating) VALUES (?, ?, ?)";
    db.query(sql, [student_id, message, rating || null], (err, result) => {
        if (err) {
            console.error("Error inserting feedback:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Feedback submitted successfully", feedbackId: result.insertId });
    });
};

// Get all feedback
exports.getAllFeedback = (req, res) => {
    const sql = "SELECT f.id, f.message, f.rating, f.created_at, s.name AS student_name FROM feedback f JOIN students s ON f.student_id = s.id ORDER BY f.created_at DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching feedback:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
};

// Get feedback by student
exports.getFeedbackByStudent = (req, res) => {
    const { studentId } = req.params;
    const sql = "SELECT * FROM feedback WHERE student_id = ? ORDER BY created_at DESC";
    db.query(sql, [studentId], (err, results) => {
        if (err) {
            console.error("Error fetching feedback:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
};

// Delete feedback
exports.deleteFeedback = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM feedback WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting feedback:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Feedback not found" });
        }
        res.status(200).json({ message: "Feedback deleted successfully" });
    });
};
