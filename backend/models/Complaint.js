const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  submittedAt: Date,
  response: String,
  respondedAt: Date,
  admin_id: { type: mongoose.Schema.Types.ObjectId, ref: "Management" },
  student_id: {type: mongoose.Schema.Types.ObjectId, ref: "Student"}
});

module.exports = mongoose.model("Complaint",complaintSchema);