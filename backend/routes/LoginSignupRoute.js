const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/Auth");

const {
    sendOtp,
    verifyOtp,
    forgotPassword
} = require("../controllers/OTP")



router.post("/signup", signup);
router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.put("/forgot-password",forgotPassword);

module.exports = router;
