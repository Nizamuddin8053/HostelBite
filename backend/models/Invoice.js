const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid"
    }
}, { timestamps: true });

invoiceSchema.index({ student_id: 1, due_date: 1 });

module.exports = mongoose.model("Invoice", invoiceSchema);