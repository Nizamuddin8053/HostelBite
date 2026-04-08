const crypto = require("crypto");
const { instance } = require("../config/razorpay");
const {mailSender} = require("../utils/mailSender.js");
const {paymentSuccessTemplate} = require("../mailTemplates/paymentSuccessTemplate");

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

            mailSender(
                "Payment confirmation email",
                email,
                htmlBody
            );
            
            
            res.status(200).json({ success: true, message: "Payment verified successfully" });
        } else {
            res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error verifying payment" });
    }
};




