const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  submittedAt: Date,
  response: String,
  respondedAt: Date,
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" }
});

const feedbackSchema = new mongoose.Schema({
  message: String,
  rating: Number,
  submittedAt: Date
});

const attendanceSchema = new mongoose.Schema({
  date: Date,
  mealType: String,
  status: String,
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" }
});


const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  roomNumber: {type:String},
  course: String,
  year: {type:String},

  complaints: [complaintSchema],
  feedbacks: [feedbackSchema],
  attendance: [attendanceSchema],
});

module.exports = mongoose.model("Student", studentSchema);