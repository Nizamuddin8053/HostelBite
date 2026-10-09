
const express = require("express");
const {
    createNotification,
    getAllNotifications,
    getNotificationsByUser,
    markAsRead,
    deleteNotification
} = require("../controllers/Staff/notificationController");



const router = express.Router();
const { isAdmin, isSelfOrAdmin, isStudentOrStaff } = require("../middlewares/auth");

// Create new notification
router.post("/createNotification", isAdmin, createNotification);

// Get all notifications
router.get("/", isAdmin, getAllNotifications);

// Get notifications by user
router.get("/:userId/:role", isSelfOrAdmin("userId", "role"), getNotificationsByUser);

// Mark notification as read
router.put("/:id/read", isStudentOrStaff, markAsRead);

// Delete notification
router.delete("/:id", isAdmin, deleteNotification);

module.exports = router;
