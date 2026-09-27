const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema(
  {
    tokenHash: {
      type: String,
      required: true,
      unique: true,
      select: false,
    },
    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "snacks", "dinner"],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Management",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QRToken", qrSchema);
