
const express = require("express");
const {
    createMenu,
    getLatestMenu,
    updateMenu
} = require("../controllers/Management/menuController");



const router = express.Router();
const { isAdmin } = require("../middlewares/auth");

// Add new menu item
router.post("/create-menu", isAdmin, createMenu);
// Get all menu items
router.get("/latest-menu",  getLatestMenu);

// Update menu item
router.patch("/update-menu", isAdmin, updateMenu);


module.exports = router;
