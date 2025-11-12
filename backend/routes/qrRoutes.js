const express = require("express");
const router = express.Router();
const qrController = require("../controllers/Management/attendanceQR");

router.get("/get-qr", qrController.getLatestQR);
module.exports = router;
