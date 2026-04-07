const Notification = require("../../models/Notification");
const Student = require("../../models/Student");

// Create notification
exports.createNotification = async (req, res) => {
  try {
    const { targetType, student_id, course, year, title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        error: "Title and message are required",
      });
    }

    let notifications = [];

    // 🧍 Single student
    if (targetType === "single") {
      if (!student_id) {
        return res.status(400).json({
          error: "Student ID is required",
        });
      }

      const student = await Student.findById({student_id});
      if(!student){
        return res.status(409).json({
          message: "user not found"
        })
      }

      notifications.push({
        student_id,
        title,
        message,
      });
    }

    //  Group (course + year)
    else if (targetType === "group") {
      if (!course || !year) {
        return res.status(400).json({
          error: "Course and year are required",
        });
      }

      const students = await Student.find({ course, year }, "_id");

      notifications = students.map((student) => ({
        student_id: student._id,
        title,
        message,
      }));
    }

    // All students
    else if (targetType === "all") {
      const students = await Student.find({}, "_id");

      notifications = students.map((student) => ({
        student_id: student._id,
        title,
        message,
      }));
    }

    else {
      return res.status(400).json({ error: "Invalid targetType" });
    }

    const result = await Notification.insertMany(notifications);

    res.status(201).json({
      message: result,
      affected: result.length,
    });

  } catch (err) {
    console.error(" Error creating notification:", err);
    res.status(500).json({ error: "can't sent notification" });
  }
};


// Get all notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);

  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// Get notifications by user
exports.getNotificationsByUser = async (req, res) => {
  try {
    const { userId, role } = req.params;

    let query = {};

    if (role === "student") query.student_id = userId;
    else if (role === "staff") query.staff_id = userId;
    else if (role === "management") query.management_id = userId;
    else {
      return res.status(400).json({ error: "Invalid role type" });
    }

    const notifications = await Notification.find(query)
      .sort({ sentAt: -1 })
      .limit(10);

    res.status(200).json(notifications);

  } catch (err) {
    console.error(" Error fetching notifications:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Notification.findOneAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        error: "Notification not found",
      });
    }

    res.status(200).json({
      message: "Notification marked as read",
    });

  } catch (err) {
    console.error("Error updating notification:", err);
    res.status(500).json({ error: "Database error" });
  }
};


// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Notification.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        error: "Notification not found",
      });
    }

    res.status(200).json({
      message: "Notification deleted successfully",
    });

  } catch (err) {
    console.error("Error deleting notification:", err);
    res.status(500).json({ error: "Database error" });
  }
};