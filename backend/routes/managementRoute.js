
const express = require("express");
const {
    createManagement,
    getAllManagement,
    getManagementById,
    updateManagement,
    deleteManagement
} = require("../controllers/Management/managementController");

const { isAdmin } = require("../middlewares/auth");

const router = express.Router();

// Create new management record
router.post("/", isAdmin, createManagement);

// Get all management records
router.get("/", isAdmin, getAllManagement);

// Get management by ID
router.get("/:id", isAdmin, getManagementById);

// Update management details
router.put("/:id", isAdmin, updateManagement);

// Delete management record
router.delete("/:id", isAdmin, deleteManagement);

module.exports = router;
