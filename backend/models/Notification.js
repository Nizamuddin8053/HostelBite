const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
{
  title: String,
  message: String,
  sentAt: { type: Date, default: Date.now },

  isRead: { type: Boolean, default: false }, 

  management_id: { type: mongoose.Schema.Types.ObjectId, ref: "Management" },
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student" }
},
{ timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);