const Staff = require("../../models/Staff");
const Student = require("../../models/Student");
const Management = require("../../models/Management");
const bcrypt = require("bcrypt");
const { emailFilter } = require("../../utils/emailFilter");
const { sendEmailMessage } = require("../../mailTemplates/commonMailTemplate");
const { mailSender } = require("../../utils/mailSender.js");


// Create new staff
exports.createStaff = async (req, res) => {
  try {
    const { name, role, email, password, salary } = req.body;
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof role !== "string" ||
      !role.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ||
      !password
    ) {
      return res.status(400).json({
        error: "Name, role , email and password are required",
      });
    }
    if (
      typeof password !== "string" ||
      password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return res.status(400).json({ error: "Password must be 8 or more characters and no more than 72 UTF-8 bytes" });
    }

    const [existingStaff, existingStudent, existingManagement] = await Promise.all([
      Staff.findOne(emailFilter(normalizedEmail)),
      Student.findOne(emailFilter(normalizedEmail)),
      Management.findOne(emailFilter(normalizedEmail)),
    ]);
    if (existingStaff || existingStudent || existingManagement) {
      return res.status(409).json({ error: "Staff already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const staff = await Staff.create({
      name: name.trim(),
      role,
      email: normalizedEmail,
      password: hashedPassword,
      salaryAmount: salary || 0,
      approved: true,
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
    const staff = await Staff.find({ approved: true })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(staff);
  } catch (err) {
    console.error("Error fetching staff:", err);
    res.status(500).json({ error: "Database error" });
  }
};

exports.getMyStaffProfile = async (req, res) => {
  try {
    const staff = await Staff.findById(req.user.id).select("name role email salaryAmount");

    if (!staff) {
      return res.status(404).json({ error: "Staff profile not found" });
    }

    res.status(200).json(staff);
  } catch (err) {
    console.error("Error fetching staff profile:", err);
    res.status(500).json({ error: "Unable to fetch staff profile" });
  }
};




// Update staff details

exports.updateStaffSalary = async (req, res) => {
  try {
    const { salaryAmount } = req.body;
    const { id } = req.params;

    // Validation
    if (!id || !salaryAmount) {
      return res.status(400).json({
        message: "Staff ID and salary are required",
      });
    }

    const salary = Number(salaryAmount);

    if (salary <= 0) {
      return res.status(400).json({
        message: "Salary must be greater than 0",
      });
    }

    // Update
    const updatedStaff = await Staff.findByIdAndUpdate(
      id,
      { $set: { salaryAmount: salary } },
      { new: true }
    ).select("-password");

    if (!updatedStaff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }


    const htmlBody = sendEmailMessage({
      title: "Salary Update Notification 💼",
      message: `
    Hello ${updatedStaff.name},

    We would like to inform you that your salary details have been successfully updated by the management.

    Please review your updated salary information by logging into your account using the link below.
  `,
      highlightText: `${process.env.FRONTEND_URL}/login`,
      footerNote: "If you have any questions or concerns, feel free to contact the HostelBite team."
    });

    await mailSender(
      "Your Salary Has Been Updated",
      updatedStaff.email,
      htmlBody
    );



    res.status(200).json({
      success: true,
      message: "Staff salary updated successfully",
      data: updatedStaff,
    });

  } catch (err) {
    console.error("Error updating staff:", err);
    res.status(500).json({
      success: false,
      message: "Database error",
    });
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
