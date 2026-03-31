const mongoose = require("mongoose");


const expenseSchema = new mongoose.Schema({
  category: {type: String, required: true},
  amount: {type: Number, required: true},
  date: {type: Date},
  description: {type: String},
  title: {type: String, required: true},
  qty: {type: Number, required: true},
  rateKg: {type: Number},
  managementId: { type: mongoose.Schema.Types.ObjectId, ref: "Management" }
},
{timestamps: true}
);

module.exports = mongoose.model("Expense", expenseSchema);