const express = require("express");
const { createOrder, verifyPayment } = require("../controllers/Payments");

const router = express.Router();
const { isStudent } = require("../middlewares/auth");

router.post("/create-order", isStudent, createOrder);
router.post("/verify-payment", isStudent, verifyPayment);

module.exports = router;
