const Invoice = require("../../models/Invoice");

const Student = require("../../models/Student");

// create invoice

exports.createInvoice = async (req, res) => {
    try {
        const { student_id, course, year, amount, due_date, status } = req.body;

        if (!amount || !due_date) {
            return res.status(400).json({
                error: "Amount and due date are required"
            });
        }



        let students = [];

        //  Case 1: Single Student
        if (student_id) {
            const student = await Student.findById(student_id);
            if (!student) {
                return res.status(404).json({ error: "Student not found" });
            }
            students.push(student);
        }

        // Case 2: Course or Course + Year
        else if (course) {
            const filter = { course };

            if (year) {
                filter.year = year;
            }

            students = await Student.find(filter);

            if (students.length === 0) {
                return res.status(404).json({
                    error: "No students found for given criteria"
                });
            }
        }

        // No valid input
        else {
            return res.status(400).json({
                error: "Provide either student_id OR course (with optional year)"
            });
        }

        // Create invoices in bulk
        const invoices = students.map((student) => ({
            student_id: student._id,
                amount,
                due_date,
                status: status || "unpaid"
        }));

        const createdInvoices = await Invoice.insertMany(invoices);

        res.status(201).json({
            message: `Invoices created for ${createdInvoices.length} student(s)`,
            invoices: createdInvoices
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
        const { student_id} = req.params;

        const studentExist = await Student.findById(student_id);

        //  Validate ObjectId
        if (!studentExist) {
            return res.status(400).json({ error: "Invalid student ID" });
        }

        const invoices = await Invoice.find( student_id )
            .sort({ createdAt: -1 });

        // Calculate total unpaid
        const totalUnpaid = invoices
            .filter(inv => inv.status === "unpaid")
            .reduce((sum, inv) => sum + inv.amount, 0);

        res.status(200).json({
            invoices,
            totalUnpaid
        });

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

