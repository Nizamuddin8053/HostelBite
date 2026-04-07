const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["present", "absent"],
      required: true,
    },
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
    email_student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    email_staff : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    email_admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Management",
    },
  },
  {
    timestamps: true,
  }
);

attendanceSchema.index({ student_id: 1, date: 1, mealType: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);