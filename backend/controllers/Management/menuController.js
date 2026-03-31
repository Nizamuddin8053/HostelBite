const Menu = require("../../models/Menu");

// Add new menu (weekly)
exports.createMenu = async (req, res) => {
  try {
    const { mealType, menuItems, managementId } = req.body;

    if (!mealType || !Array.isArray(menuItems) || menuItems.length === 0) {
      return res.status(400).json({ error: "Meal type and menu items are required" });
    }

    // Check if mealType already exists
    const existing = await Menu.findOne({ mealType });
    if (existing) {
      return res.status(400).json({ error: `${mealType} menu already added` });
    }

    // Insert all days
    const menuData = menuItems.map(item => ({
      day: item.day,
      mealType,
      items: item.items,
      managementId
    }));

    await Menu.insertMany(menuData);

    res.status(201).json({ message: `${mealType} menu added successfully` });

  } catch (error) {
    console.error("Error creating menu:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.getAllMenu = async (req, res) => {
  try {
    const menu = await Menu.find().sort({ day: 1, mealType: 1 });
    res.status(200).json(menu);
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }

    res.status(200).json(menu);

  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.updateMenu = async (req, res) => {
  try {
    const { mealType, items, day } = req.body;

    const updatedMenu = await Menu.findByIdAndUpdate(
      req.params.id,
      { mealType, items, day },
      { new: true }
    );

    if (!updatedMenu) {
      return res.status(404).json({ error: "Menu not found" });
    }

    res.status(200).json({ message: "Menu updated successfully", data: updatedMenu });

  } catch (error) {
    console.error("Error updating menu:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.deleteMenu = async (req, res) => {
  try {
    const result = await Menu.deleteMany();

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Menu not found" });
    }

    res.status(200).json({ message: "All menu deleted successfully" });

  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({ error: "Server error" });
  }
};

