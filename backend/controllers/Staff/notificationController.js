
const db = require("../../config/Database");


//  Create notification (to single user, multiple users, or all)

exports.createNotification = (req, res) => {
    const { targetType, student_id, course, year, title, message } = req.body;

    if (!title || !message) {
        return res.status(400).json({ error: "Title and message are required" });
    }

    let sql;
    let params = [];

    // 🧍 Send to a single student
    if (targetType === "single") {
        if (!student_id) {
            return res.status(400).json({ error: "Student ID is required for single notification" });
        }
        sql = `
            INSERT INTO notifications (student_id, title, message, sent_at)
            VALUES (?, ?, ?, NOW())
        `;
        params = [student_id, title, message];
    }

    // 👥 Send to all students of a particular course & year
    else if (targetType === "group") {
        if (!course || !year) {
            return res.status(400).json({ error: "Course and year are required for group notifications" });
        }
        sql = `
            INSERT INTO notifications (student_id, title, message, sent_at)
            SELECT student_id, ?, ?, NOW() FROM student
            WHERE course = ? AND year = ?
        `;
        params = [title, message, course, year];
    }

    // 🌎 Send to all students
    else if (targetType === "all") {
        sql = `
            INSERT INTO notifications (student_id, title, message, sent_at)
            SELECT student_id, ?, ?, NOW() FROM student
        `;
        params = [title, message];
    }

    else {
        return res.status(400).json({ error: "Invalid targetType" });
    }

    // Execute SQL
    db.query(sql, params, (err, result) => {
        if (err) {
            console.error("❌ Error creating notification:", err);
            return res.status(500).json({ error: "Database error", details: err });
        }

        res.status(201).json({
            message: "✅ Notification(s) created successfully",
            affected: result.affectedRows
        });
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
    const { userId, role } = req.params;
    console.log(userId,role); 
    

    let columnName;

    if (role === "student") columnName = "student_id";
    else if (role === "staff") columnName = "staff_id";
    else if (role === "management") columnName = "management_id";
    else {
        return res.status(400).json({ error: "Invalid role type" });
    }

    const sql = `
        SELECT notification_id, title, message, sent_at 
        FROM notifications 
        WHERE ${columnName} = ? 
        ORDER BY sent_at DESC 
        LIMIT 10
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("❌ Error fetching notifications:", err);
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
