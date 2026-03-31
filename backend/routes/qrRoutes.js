const express = require("express");
const router = express.Router();
const qrController = require("../controllers/Management/attendanceQR");
const {auth,isStudent, isAdmin}  = require("../middlewares/auth");

router.get("/get-qr",  auth, isAdmin, qrController.getLatestQR);
module.exports = router;
