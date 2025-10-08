
const express = require("express");
const {
    createManagement,
    getAllManagement,
    getManagementById,
    updateManagement,
    deleteManagement
} = require("../controllers/Management/managementController");

const router = express.Router();

// Create new management record
router.post("/", createManagement);

// Get all management records
router.get("/", getAllManagement);

// Get management by ID
router.get("/:id", getManagementById);

// Update management details
router.put("/:id", updateManagement);

// Delete management record
router.delete("/:id", deleteManagement);

module.exports = router;
