
const express = require("express");
const {
    createNotification,
    getAllNotifications,
    getNotificationsByUser,
    markAsRead,
    deleteNotification
} = require("../controllers/Staff/notificationController");

const {auth,isStudent, isAdmin}  = require("../middlewares/auth");

const router = express.Router();

// Create new notification
router.post("/createNotification",  auth, isAdmin, createNotification);

// Get all notifications
router.get("/",  getAllNotifications);

// Get notifications by user
router.get("/:userId/:role",  getNotificationsByUser);

// Mark notification as read
router.put("/:id/read",  markAsRead);

// Delete notification
router.delete("/:id",  deleteNotification);

module.exports = router;
