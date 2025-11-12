const crypto = require("crypto");
const { instance } = require("../config/razorpay");
const nodemailer = require("nodemailer");

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
            await sendVerificationEmail(email, name, amount, razorpay_payment_id);
            res.status(200).json({ success: true, message: "Payment verified successfully" });
        } else {
            res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error verifying payment" });
    }
};

// 📧 Helper function to send email
const sendVerificationEmail = async (email, name, amount, paymentId) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"Mess Fees Payment" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Mess Fees Payment Confirmation",
        html: `
      <h2>Hello ${name},</h2>
      <p>Thank you for paying your <b>Mess Fees</b>.</p>
      <p><b>Payment ID:</b> ${paymentId}</p>
      <p><b>Amount Paid:</b> ₹${amount}</p>
      <p>Your payment has been successfully received.</p>
      <br/>
      <p>Regards,<br/>Mess Management Team</p>
    `,
    };

    await transporter.sendMail(mailOptions);
};
