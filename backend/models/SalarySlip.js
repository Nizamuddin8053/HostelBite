const mongoose = require("mongoose");

const salarySlipSchema = new mongoose.Schema(
{
  forMonth: Date,
  amount: Number,
  status: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("SalarySlip", salarySlipSchema);