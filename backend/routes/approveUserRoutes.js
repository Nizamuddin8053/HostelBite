const express = require("express");
const router = express.Router();

const {
    checkApprove,
    getUnapprovedUser,
    approveUser

} =  require("../controllers/Management/approveController");
const { isAdmin } = require("../middlewares/auth");



// unapprove staff
router.get("/unapproved", isAdmin, getUnapprovedUser);

// check user is approved or not 
router.post("/checkapprove", isAdmin, checkApprove);

// approve staff
router.put("/approve/:id", isAdmin, approveUser);

module.exports = router;