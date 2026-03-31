const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  day: String,
  mealType: String,
  items: String,
  managementId: { type: mongoose.Schema.Types.ObjectId, ref: "Management" }
});

module.exports = mongoose.model("Menu", menuSchema);