
const express = require("express");
const {
    createMenu,
    getLatestMenu,
    updateMenu
} = require("../controllers/Management/menuController");



const router = express.Router();

// Add new menu item
router.post("/create-menu",createMenu);
// Get all menu items
router.get("/latest-menu",  getLatestMenu);

// Update menu item
router.patch("/update-menu", updateMenu);


module.exports = router;
