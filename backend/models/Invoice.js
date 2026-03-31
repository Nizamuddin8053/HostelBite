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

module.exports = mongoose.model("Invoice", invoiceSchema);