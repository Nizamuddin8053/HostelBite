const express = require("express");
const router = express.Router();

const {
    checkApprove,
    getUnapprovedUser,
    approveUser

} =  require("../controllers/Management/approveController");



// unapprove staff
router.get("/unapproved", getUnapprovedUser);

// check user is approved or not 
router.post("/checkapprove", checkApprove);

// approve staff
router.put("/approve/:id", approveUser);

module.exports = router;