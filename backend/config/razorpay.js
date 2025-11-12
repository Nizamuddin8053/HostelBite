const Razorpay = require("razorpay");

exports.instance = new Razorpay({
    key_id: process.env.API_KEY,
    key_secret: process.env.API_SECRET
})