
const express = require("express");
const {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    getInvoicesByStudent,
    updateInvoiceStatus,
    deleteInvoice
} = require("../controllers/Student/invoiceController");

const router = express.Router();

// Create new invoice
router.post("/", createInvoice);

// Get all invoices
router.get("/", getAllInvoices);

// Get invoice by ID
router.get("/:id", getInvoiceById);

// Get invoices by student
router.get("/student/:studentId", getInvoicesByStudent);

// Update invoice status
router.put("/:id/status", updateInvoiceStatus);

// Delete invoice
router.delete("/:id", deleteInvoice);

module.exports = router;
