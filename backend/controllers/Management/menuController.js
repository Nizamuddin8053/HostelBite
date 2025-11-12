
const db = require("../../config/Database");

// Add new menu item
exports.createMenu = (req, res) => {
    
    const { meal_type, menuItems } = req.body;
    // menuItems = [{ day: "Monday", items: "Poha, Tea" }, ...]

    if (!meal_type || !Array.isArray(menuItems) || menuItems.length === 0) {
        return res.status(400).json({ error: "Meal type and menu items are required" });
    }

    // Step 1: Check if meal type already exists
    const checkSql = "SELECT COUNT(*) AS count FROM menu WHERE meal_type = ?";
    db.query(checkSql, [meal_type], (err, results) => {
        if (err) {
            console.error("Error checking menu:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results[0].count > 0) {
            return res.status(400).json({ error: `${meal_type} menu already added` });
        }

        // Step 2: Insert all 7 day records
        const sql = "INSERT INTO menu (day, meal_type, items) VALUES ?";
        const values = menuItems.map((m) => [m.day, meal_type, m.items]);

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error("Error inserting weekly menu:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.status(201).json({ message: `${meal_type} menu added successfully` });
        });
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
    
    const { day, meal_type, items } = req.body;

    const sql = "UPDATE menu SET meal_type = ?, items = ? WHERE day = ?";
    db.query(sql, [meal_type, items, day], (err, result) => {
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
    
    const sql = "DELETE FROM menu";
    db.query(sql, (err, result) => {
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
