const Management = require("../../models/Management");
const Student = require("../../models/Student");
const Staff = require("../../models/Staff");
const bcrypt = require("bcrypt");
const { emailFilter } = require("../../utils/emailFilter");


exports.createManagement = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (
      typeof name !== "string" ||
      !name.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ||
      !password
    ) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }
    if (
      typeof password !== "string" ||
      password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return res.status(400).json({ error: "Password must be 8 or more characters and no more than 72 UTF-8 bytes" });
    }

    const [existingManagement, existingStudent, existingStaff] = await Promise.all([
      Management.findOne(emailFilter(normalizedEmail)),
      Student.findOne(emailFilter(normalizedEmail)),
      Staff.findOne(emailFilter(normalizedEmail)),
    ]);
    if (existingManagement || existingStudent || existingStaff) {
      return res.status(409).json({ error: "Email already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);



    const newManagement = await Management.create({
      name: name.trim(),
      email: normalizedEmail,
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
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(managementList);

  } catch (error) {
    console.error("Error fetching management:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.getManagementById = async (req, res) => {
  try {
    const management = await Management.findById(req.params.id).select("-password");

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
    const updates = {};
    if (typeof name === "string" && name.trim()) updates.name = name.trim();
    if (typeof email === "string" && email.trim()) {
      const normalizedEmail = email.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
        return res.status(400).json({ error: "Enter a valid email address" });
      }

      const [existingManagement, existingStudent, existingStaff] = await Promise.all([
        Management.findOne({ ...emailFilter(normalizedEmail), _id: { $ne: req.params.id } }),
        Student.findOne(emailFilter(normalizedEmail)),
        Staff.findOne(emailFilter(normalizedEmail)),
      ]);
      if (existingManagement || existingStudent || existingStaff) {
        return res.status(409).json({ error: "Email already exists" });
      }
      updates.email = normalizedEmail;
    }
    if (password !== undefined) {
      if (
        typeof password !== "string" ||
        password.length < 8 ||
        Buffer.byteLength(password, "utf8") > 72
      ) {
        return res.status(400).json({ error: "Password must be 8 or more characters and no more than 72 UTF-8 bytes" });
      }
      updates.password = await bcrypt.hash(password, 10);
    }
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "Provide at least one valid field to update" });
    }

    const updated = await Management.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

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