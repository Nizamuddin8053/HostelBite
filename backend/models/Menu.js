const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  breakfast: [{ type: String }],
  lunch: [{ type: String }],
  snacks: [{type: String}],
  dinner: [{ type: String }]
}, { _id: false });

const weeklyMenuSchema = new mongoose.Schema({
  weekStartDate: {
    type: Date,
    required: true
  },

  monday: mealSchema,
  tuesday: mealSchema,
  wednesday: mealSchema,
  thursday: mealSchema,
  friday: mealSchema,
  saturday: mealSchema,
  sunday: mealSchema,

  managementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Management",
    required: true
  }
}, { timestamps: true });

weeklyMenuSchema.index({ weekStartDate: 1 }, { unique: true });

module.exports = mongoose.model("WeeklyMenu", weeklyMenuSchema);