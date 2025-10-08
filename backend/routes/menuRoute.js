// routes/menu.js
const express = require("express");
const {
    createMenu,
    getAllMenu,
    getMenuById,
    updateMenu,
    deleteMenu
} = require("../controllers/Management/menuController");

const router = express.Router();

// Add new menu item
router.post("/", createMenu);

// Get all menu items
router.get("/", getAllMenu);

// Get menu by ID
router.get("/:id", getMenuById);

// Update menu item
router.put("/:id", updateMenu);

// Delete menu item
router.delete("/:id", deleteMenu);

module.exports = router;
