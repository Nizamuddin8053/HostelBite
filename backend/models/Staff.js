const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: String,
  role: String,
  email: { type: String, unique: true },
  password: { type: String, required: true, select: false },
  salaryAmount: Number,
  approved: {type: Boolean, default: false},
  managementId: { type: mongoose.Schema.Types.ObjectId, ref: "Management" }
},
{timestamps: true}
);

module.exports = mongoose.model("Staff", staffSchema);