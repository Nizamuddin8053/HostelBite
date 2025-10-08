
const express = require("express");
const {
    createNotification,
    getAllNotifications,
    getNotificationsByUser,
    markAsRead,
    deleteNotification
} = require("../controllers/Staff/notificationController");

const router = express.Router();

// Create new notification
router.post("/", createNotification);

// Get all notifications
router.get("/", getAllNotifications);

// Get notifications by user
router.get("/user/:userId", getNotificationsByUser);

// Mark notification as read
router.put("/:id/read", markAsRead);

// Delete notification
router.delete("/:id", deleteNotification);

module.exports = router;
