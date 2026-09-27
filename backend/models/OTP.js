const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  otp: {
    type: String,
    required: true,
    select: false,
  },
  purpose: {
    type: String,
    enum: ["signup", "password-reset"],
    default: "signup",
    required: true,
  },
  resetTokenHash: {
    type: String,
    select: false,
  },
  verifiedAt: {
    type: Date,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  attempts: {
    type: Number,
    default: 0, // track wrong attempts
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});




module.exports = mongoose.model("OTP", otpSchema);