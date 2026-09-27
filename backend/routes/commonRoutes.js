const express = require("express");
const router = express.Router();

const {

    getUserByEmail,

} = require("../controllers/commonController/userController");

router.get("/me", getUserByEmail);


module.exports = router;