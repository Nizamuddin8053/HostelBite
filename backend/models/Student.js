const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  roomNumber: {type:String},
  course: {type: String},
  year: {type:String},

  
});

module.exports = mongoose.model("Student", studentSchema);