const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
{
  title: String,
  message: String,
  sentAt: { type: Date, default: Date.now },

  isRead: { type: Boolean, default: false }, 

  managementId: { type: mongoose.Schema.Types.ObjectId, ref: "Management" },
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" }
},
{ timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);