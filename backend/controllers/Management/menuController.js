
const db = require("../../config/Database");

// Add new menu item
exports.createMenu = (req, res) => {
    const { day, meal_type, items } = req.body;

    if (!day || !meal_type || !items) {
        return res.status(400).json({ error: "Day, meal type, and items are required" });
    }

    const sql = "INSERT INTO menu (day, meal_type, items) VALUES (?, ?, ?)";
    db.query(sql, [day, meal_type, items], (err, result) => {
        if (err) {
            console.error("Error inserting menu:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Menu added successfully", menuId: result.insertId });
    });
};

// Get all menu items
exports.getAllMenu = (req, res) => {
    const sql = "SELECT * FROM menu ORDER BY day, meal_type";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching menu:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
};

// Get menu by ID
exports.getMenuById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM menu WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching menu:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Menu not found" });
        }
        res.status(200).json(result[0]);
    });
};

// Update menu item
exports.updateMenu = (req, res) => {
    const { id } = req.params;
    const { day, meal_type, items } = req.body;

    const sql = "UPDATE menu SET day = ?, meal_type = ?, items = ? WHERE id = ?";
    db.query(sql, [day, meal_type, items, id], (err, result) => {
        if (err) {
            console.error("Error updating menu:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Menu not found" });
        }
        res.status(200).json({ message: "Menu updated successfully" });
    });
};

// Delete menu item
exports.deleteMenu = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM menu WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting menu:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Menu not found" });
        }
        res.status(200).json({ message: "Menu deleted successfully" });
    });
};
