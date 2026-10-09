const crypto = require("crypto");
const { instance } = require("../config/razorpay");
const {mailSender} = require("../utils/mailSender.js");
const {paymentSuccessTemplate} = require("../mailTemplates/paymentSuccessTemplate");
const Invoice = require("../models/Invoice");

const invoiceReceipt = (invoiceId) => `invoice_${invoiceId}`;

exports.createInvoiceOrder = async (req, res) => {
    try {
        const { invoice_id } = req.body;
        const invoice = await Invoice.findOne({
            _id: invoice_id,
            student_id: req.user.id,
            status: "unpaid",
        });

        if (!invoice) {
            return res.status(404).json({ success: false, message: "Pending invoice not found" });
        }

        const order = await instance.orders.create({
            amount: Math.round(invoice.amount * 100),
            currency: "INR",
            receipt: invoiceReceipt(invoice._id.toString()),
            notes: {
                invoice_id: invoice._id.toString(),
                student_id: req.user.id,
            },
        });

        res.status(200).json({
            success: true,
            order,
            keyId: process.env.API_KEY,
        });
    } catch (error) {
        console.error("Invoice payment order creation failed:", error);
        res.status(500).json({ success: false, message: "Could not start invoice payment" });
    }
};

exports.verifyInvoicePayment = async (req, res) => {
    try {
        const {
            invoice_id,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;
        const invoice = await Invoice.findOne({
            _id: invoice_id,
            student_id: req.user.id,
        }).populate("student_id", "name email");

        if (!invoice) {
            return res.status(404).json({ success: false, message: "Invoice not found" });
        }

        if (!process.env.API_SECRET || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment verification details are incomplete" });
        }

        const order = await instance.orders.fetch(razorpay_order_id);
        if (
            order.receipt !== invoiceReceipt(invoice._id.toString()) ||
            order.amount !== Math.round(invoice.amount * 100) ||
            order.notes?.student_id !== req.user.id
        ) {
            return res.status(400).json({ success: false, message: "Payment order does not match this invoice" });
        }

        const expectedSignature = crypto
            .createHmac("sha256", process.env.API_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest();
        const receivedSignature = Buffer.from(razorpay_signature, "hex");
        if (
            expectedSignature.length !== receivedSignature.length ||
            !crypto.timingSafeEqual(expectedSignature, receivedSignature)
        ) {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }

        const payment = await instance.payments.fetch(razorpay_payment_id);
        if (
            payment.order_id !== razorpay_order_id ||
            payment.amount !== Math.round(invoice.amount * 100) ||
            payment.currency !== "INR" ||
            payment.status !== "captured"
        ) {
            return res.status(400).json({ success: false, message: "Payment has not been captured for this invoice" });
        }

        if (invoice.status === "paid") {
            if (invoice.payment_id === razorpay_payment_id) {
                return res.status(200).json({ success: true, message: "Invoice payment was already confirmed", invoice });
            }
            return res.status(409).json({ success: false, message: "This invoice has already been paid" });
        }

        const updatedInvoice = await Invoice.findOneAndUpdate(
            { _id: invoice._id, status: "unpaid" },
            {
                status: "paid",
                payment_id: razorpay_payment_id,
                payment_order_id: razorpay_order_id,
                paid_at: new Date(),
            },
            { new: true }
        );

        if (!updatedInvoice) {
            return res.status(409).json({ success: false, message: "This invoice has already been paid" });
        }

        let emailSent = true;
        try {
            await mailSender(
                "HostelBite payment confirmation",
                invoice.student_id.email,
                paymentSuccessTemplate({
                    razorpay_payment_id,
                    email: invoice.student_id.email,
                    name: invoice.student_id.name,
                    amount: invoice.amount,
                })
            );
        } catch (emailError) {
            emailSent = false;
            console.error("Payment succeeded but confirmation email could not be sent:", emailError);
        }

        res.status(200).json({
            success: true,
            message: emailSent
                ? "Payment completed and confirmation email sent"
                : "Payment completed, but the confirmation email could not be sent",
            emailSent,
            invoice: updatedInvoice,
        });
    } catch (error) {
        console.error("Invoice payment verification failed:", error);
        res.status(500).json({ success: false, message: "Could not verify invoice payment" });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { amount, name, email } = req.body; // amount in rupees

        const options = {
            amount: Number(amount * 100), // Razorpay works in paise
            currency: "INR",
            receipt: "receipt_" + Math.floor(Math.random() * 10000),
        };

        const order = await instance.orders.create(options);
        res.status(200).json({
            success: true,
            order,
            name,
            email,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Order creation failed" });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email, name, amount } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.API_SECRET)
            .update(body.toString())
            .digest("hex");

        console.log("Expected Signature:", expectedSignature);
        console.log("Received Signature:", razorpay_signature);
        console.log("Match:", expectedSignature === razorpay_signature);    

        if (expectedSignature === razorpay_signature) {
            // ✅ Signature verified -> Send verification email

            // send payment success mail

            const htmlBody = paymentSuccessTemplate({
                razorpay_payment_id,
                email,
                name,
                amount
            });

            let emailSent = true;
            try {
                await mailSender("Payment confirmation email", email, htmlBody);
            } catch (emailError) {
                emailSent = false;
                console.error("Payment verified but confirmation email could not be sent:", emailError);
            }

            res.status(200).json({
                success: true,
                message: emailSent
                    ? "Payment verified successfully"
                    : "Payment verified, but confirmation email could not be sent",
                emailSent,
            });
        } else {
            res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error verifying payment" });
    }
};

