const express = require("express");
const {
    createOrder,
    verifyPayment,
    createInvoiceOrder,
    verifyInvoicePayment,
} = require("../controllers/Payments");

const router = express.Router();
const { isStudent } = require("../middlewares/auth");

router.post("/create-order", isStudent, createOrder);
router.post("/verify-payment", isStudent, verifyPayment);
router.post("/invoice/create-order", isStudent, createInvoiceOrder);
router.post("/invoice/verify-payment", isStudent, verifyInvoicePayment);

module.exports = router;
