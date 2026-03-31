const Management = require("../../models/Management");
const bcrypt = require("bcrypt");


exports.createManagement = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Check duplicate email
    const existing = await Management.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);



    const newManagement = await Management.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Management added successfully",
      managementId: newManagement._id
    });

  } catch (error) {
    console.error("Error creating management:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.getAllManagement = async (req, res) => {
  try {
    const managementList = await Management
      .find()
      .sort({ createdAt: -1 });

    res.status(200).json(managementList);

  } catch (error) {
    console.error("Error fetching management:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.getManagementById = async (req, res) => {
  try {
    const management = await Management.findById(req.params.id);

    if (!management) {
      return res.status(404).json({ error: "Management record not found" });
    }

    res.status(200).json(management);

  } catch (error) {
    console.error("Error fetching management:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.updateManagement = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updated = await Management.findByIdAndUpdate(
      req.params.id,
      { name, email, password: hashedPassword },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Management record not found" });
    }

    res.status(200).json({
      message: "Management updated successfully",
      data: updated
    });

  } catch (error) {
    console.error("Error updating management:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.deleteManagement = async (req, res) => {
  try {
    const deleted = await Management.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Management record not found" });
    }

    res.status(200).json({ message: "Management deleted successfully" });

  } catch (error) {
    console.error("Error deleting management:", error);
    res.status(500).json({ error: "Server error" });
  }
};