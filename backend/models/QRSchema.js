const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
  token: String,
  expiresAt: Date,
});

module.exports = mongoose.model("QRToken", qrSchema);