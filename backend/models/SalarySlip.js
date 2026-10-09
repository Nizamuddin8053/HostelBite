const mongoose = require("mongoose");

const salarySlipSchema = new mongoose.Schema(
{
  forMonth: { type: Date, required: true },
  amount: { type: Number, required: true, min: 0.01 },
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
    required: true,
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("SalarySlip", salarySlipSchema);