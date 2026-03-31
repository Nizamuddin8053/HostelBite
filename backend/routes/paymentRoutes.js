const express = require("express");
const { createOrder, verifyPayment } = require("../controllers/Payments");

const router = express.Router();
const {auth,isStudent, isAdmin}  = require("../middlewares/auth");

router.post("/create-order",  auth, createOrder);
router.post("/verify-payment", auth ,verifyPayment);

module.exports = router;
