const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
  message: String,
  rating: Number,
  submittedAt: Date,
  student_id:{type: mongoose.Schema.Types.ObjectId, ref:"Student"},
  admin_id:{type:mongoose.Schema.Types.ObjectId, ref: "Management"},
  staff_id: {type: mongoose.Schema.Types.ObjectId, ref: "Staff"}
});

module.exports = mongoose.model("Feedback", feedbackSchema);