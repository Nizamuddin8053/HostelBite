
const express = require("express");
const {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    getInvoicesByStudent,
    updateInvoiceStatus,
    deleteInvoice
} = require("../controllers/Student/invoiceController");
const { isAdmin, isSelfOrAdmin } = require("../middlewares/auth");



const router = express.Router();

// Create new invoice
router.post("/create", isAdmin, createInvoice);

// Get all invoices
router.get("/", isAdmin, getAllInvoices);

// Get invoice by ID
router.get("/:id", isAdmin, getInvoiceById);

// Get invoices by student
router.get("/student/:student_id", isSelfOrAdmin("student_id", undefined, "student"), getInvoicesByStudent);

// Update invoice status
router.put("/:id/status", isAdmin, updateInvoiceStatus);

// Delete invoice
router.delete("/:id", isAdmin, deleteInvoice);

module.exports = router;
