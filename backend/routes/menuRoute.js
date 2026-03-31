// routes/menu.js
const express = require("express");
const {
    createMenu,
    getAllMenu,
    getMenuById,
    updateMenu,
    deleteMenu
} = require("../controllers/Management/menuController");

const {auth,isStudent, isAdmin}  = require("../middlewares/auth");

const router = express.Router();

// Add new menu item
router.post("/", auth,isAdmin, createMenu);

// Get all menu items
router.get("/getAll",  getAllMenu);

// Get menu by ID
router.get("/:id",  getMenuById);

// Update menu item
router.put("/updateMenu",  auth, isAdmin, updateMenu);

// Delete menu item
router.delete("/delete",  deleteMenu);

module.exports = router;
