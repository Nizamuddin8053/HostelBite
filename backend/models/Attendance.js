const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "snacks", "dinner"],
      required: true,
    },
    status: {
      type: String,
      enum: ["present", "absent"],
      default: "present",
      required: true,
    },
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WeeklyMenu",
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    email_student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

attendanceSchema.index({ student_id: 1, date: 1, mealType: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
