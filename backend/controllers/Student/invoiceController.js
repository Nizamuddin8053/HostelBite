
const db = require("../../config/Database");

// Create new invoice
exports.createInvoice = (req, res) => {
    const { student_id, amount, due_date, status } = req.body;

    if (!student_id || !amount || !due_date) {
        return res.status(400).json({ error: "Student ID, amount, and due date are required" });
    }

    const sql = "INSERT INTO invoice (student_id, amount, due_date, status) VALUES (?, ?, ?, ?)";
    db.query(sql, [student_id, amount, due_date, status || "unpaid"], (err, result) => {
        if (err) {
            console.error("Error inserting invoice:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Invoice created successfully", invoiceId: result.insertId });
    });
};

// Get all invoices
exports.getAllInvoices = (req, res) => {
    const sql = `
        SELECT i.id, i.amount, i.due_date, i.status, i.created_at, 
               s.name AS student_name, s.email AS student_email
        FROM invoice i 
        JOIN student s ON i.student_id = s.id
        ORDER BY i.created_at DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching invoices:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
};

// Get invoice by ID
exports.getInvoiceById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM invoice WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching invoice:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Invoice not found" });
        }
        res.status(200).json(result[0]);
    });
};

// Get invoices by student
exports.getInvoicesByStudent = (req, res) => {
    const { studentId } = req.params;
    const sql = "SELECT * FROM invoice WHERE student_id = ? ORDER BY created_at DESC";
    db.query(sql, [studentId], (err, results) => {
        if (err) {
            console.error("Error fetching student invoices:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
};

// Update invoice status (paid/unpaid)
exports.updateInvoiceStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: "Status is required" });
    }

    const sql = "UPDATE invoice SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error("Error updating invoice:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Invoice not found" });
        }
        res.status(200).json({ message: "Invoice status updated successfully" });
    });
};

// Delete invoice
exports.deleteInvoice = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM invoice WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting invoice:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Invoice not found" });
        }
        res.status(200).json({ message: "Invoice deleted successfully" });
    });
};
