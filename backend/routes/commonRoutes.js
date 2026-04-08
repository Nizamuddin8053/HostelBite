const express = require("express");
const router = express.Router();

const {

    getUserByEmail,

} = require("../controllers/commonController/userController");

router.post("/getUser", getUserByEmail);


module.exports = router;