const Invoice = require("../../models/Invoice");

// create invoice

exports.createInvoice = async (req, res) => {
    try {
        const { student_id, amount, due_date, status } = req.body;

        if (!student_id || !amount || !due_date) {
            return res.status(400).json({
                error: "Student ID, amount, and due date are required"
            });
        }

        const invoice = await Invoice.create({
            student_id,
            amount,
            due_date,
            status: status || "unpaid"
        });

        res.status(201).json({
            message: "Invoice created successfully",
            invoiceId: invoice._id
        });

    } catch (err) {
        console.error("Error creating invoice:", err);
        res.status(500).json({ error: "Database error" });
    }
};

// get all invoice 

exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find()
            .populate("student_id", "name email") // like JOIN
            .sort({ createdAt: -1 });

        const formatted = invoices.map(inv => ({
            id: inv._id,
            amount: inv.amount,
            due_date: inv.due_date,
            status: inv.status,
            created_at: inv.createdAt,
            student_name: inv.student_id?.name,
            student_email: inv.student_id?.email
        }));

        res.status(200).json(formatted);

    } catch (err) {
        console.error("Error fetching invoices:", err);
        res.status(500).json({ error: "Database error" });
    }
};

// get invoice by invoice id

exports.getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;

        const invoice = await Invoice.findById(id);

        if (!invoice) {
            return res.status(404).json({ error: "Invoice not found" });
        }

        res.status(200).json(invoice);

    } catch (err) {
        console.error("Error fetching invoice:", err);
        res.status(500).json({ error: "Database error" });
    }
};


// get invoices by student

exports.getInvoicesByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const invoices = await Invoice.find({ student_id: studentId })
            .sort({ createdAt: -1 });

        res.status(200).json(invoices);

    } catch (err) {
        console.error("Error fetching student invoices:", err);
        res.status(500).json({ error: "Database error" });
    }
};


// update invoice status

exports.updateInvoiceStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: "Status is required" });
        }

        const updatedInvoice = await Invoice.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedInvoice) {
            return res.status(404).json({ error: "Invoice not found" });
        }

        res.status(200).json({
            message: "Invoice status updated successfully"
        });

    } catch (err) {
        console.error("Error updating invoice:", err);
        res.status(500).json({ error: "Database error" });
    }
};


// delete invoice 

exports.deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Invoice.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: "Invoice not found" });
        }

        res.status(200).json({
            message: "Invoice deleted successfully"
        });

    } catch (err) {
        console.error("Error deleting invoice:", err);
        res.status(500).json({ error: "Database error" });
    }
};

