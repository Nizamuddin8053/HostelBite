const Staff = require("../../models/Staff");

// Create new staff
exports.createStaff = async (req, res) => {
  try {
    const { name, role,  email, password, salary } = req.body;

    if (!name || !role || !email  || !password) {
      return res.status(400).json({
        error: "Name, role , email and password are required",
      });
    }

    //  Check duplicate email
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ error: "Staff already exists" });
    }

    const staff = await Staff.create({
      name,
      role,
      email,
      password,
      salaryAmount: salary || 0,
    });

    res.status(201).json({
      message: "Staff added successfully",
      staffId: staff._id,
    });

  } catch (err) {
    console.error("Error inserting staff:", err);
    res.status(500).json({ error: "Database error" });
  }
};


// Get all staff
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });

    res.status(200).json(staff);
  } catch (err) {
    console.error("Error fetching staff:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// Get staff by ID
exports.getStaffById = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await Staff.findById(id);

    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    res.status(200).json(staff);

  } catch (err) {
    console.error("Error fetching staff:", err);
    res.status(500).json({ error: "Database error" });
  }
};


// Update staff details
exports.updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, email, password, salary } = req.body;

    const updatedStaff = await Staff.findByIdAndUpdate(
      id,
      {
        name,
        role,
        email,
        password,
        salaryAmount: salary,
      },
      { new: true }
    );

    if (!updatedStaff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    res.status(200).json({
      message: "Staff updated successfully",
      data: updatedStaff,
    });

  } catch (err) {
    console.error("Error updating staff:", err);
    res.status(500).json({ error: "Database error" });
  }
};


// Delete staff
exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStaff = await Staff.findByIdAndDelete(id);

    if (!deletedStaff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    res.status(200).json({
      message: "Staff deleted successfully",
    });

  } catch (err) {
    console.error("Error deleting staff:", err);
    res.status(500).json({ error: "Database error" });
  }
};