const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  roomNumber: {type:String},
  course: {type: String},
  approved: {type: Boolean, default: false},
  year: {type:String},
  managementId: { type: mongoose.Schema.Types.ObjectId, ref: "Management" }

  
},
{timestamps: true}
);

module.exports = mongoose.model("Student", studentSchema);