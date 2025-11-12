
const db = require("../../config/Database");

// Create a new notification
exports.createNotification = (req, res) => {
    const {user_id, title, message } = req.body;
    

    if (!title || !message) {
        return res.status(400).json({ error: "Title and message are required" });
    }

    const sql = "INSERT INTO notifications (user_id, title, message, sent_at) VALUES (?, ?, ?, Now())";
    db.query(sql, [user_id || null, title, message, sent_at], (err, result) => {
        if (err) {
            console.error("Error creating notification:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Notification created successfully", notificationId: result.insertId });
    });
};

// Get all notifications
exports.getAllNotifications = (req, res) => {
    const sql = "SELECT * FROM notifications ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching notifications:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
};

// Get notifications by user
exports.getNotificationsByUser = (req, res) => {
    const { userId } = req.params;
    const sql = "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC";
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching user notifications:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
};

// Mark notification as read
exports.markAsRead = (req, res) => {
    const { id } = req.params;
    const sql = "UPDATE notifications SET is_read = 1 WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error updating notification:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.status(200).json({ message: "Notification marked as read" });
    });
};

// Delete notification
exports.deleteNotification = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM notifications WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting notification:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.status(200).json({ message: "Notification deleted successfully" });
    });
};
