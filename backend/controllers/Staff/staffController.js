const Staff = require("../../models/Staff");
const { sendEmailMessage } = require("../../mailTemplates/commonMailTemplate");
const { mailSender } = require("../../utils/mailSender.js");

// Create new staff
exports.createStaff = async (req, res) => {
  try {
    const { name, role, email, password, salary } = req.body;

    if (!name || !role || !email || !password) {
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
    const staff = await Staff.find({ approved: true }).sort({ createdAt: -1 });

    res.status(200).json(staff);
  } catch (err) {
    console.error("Error fetching staff:", err);
    res.status(500).json({ error: "Database error" });
  }
};



// fetch unapproved staff 
exports.getUnapprovedStaff = async (req, res) => {
  try {

    const staff = await Staff.find({ approved: false })
      .sort({ createdAt: -1 }) // latest first
      .select("-password"); // ❗ don't expose sensitive data

    res.status(200).json({
      success: true,
      count: staff.length,
      data: staff,
    });

  } catch (err) {
    console.error("Error fetching unapproved staff:", err);

    res.status(500).json({
      success: false,
      error: "Server error while fetching unapproved staff",
    });
  }
};

// get all staff's are not approved

exports.approveStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await Staff.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    );

    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }


    const htmlBody = sendEmailMessage({
      title: "Welcome to HostelBite 🎉",
      message: `
    Hello, ${staff.name}

    We’re pleased to inform you that your account has been successfully approved by the management.

    You can now access your account and start using HostelBite services.
    Please click the link below to log in:
  `,
      highlightText: `${process.env.FRONTEND_URL}/login`,
      footerNote: "If you have any questions, feel free to contact the HostelBite team."
    });

    await mailSender(
      "Your HostelBite Account Has Been Approved",
      staff.email,
      htmlBody
    );

    res.status(200).json({
      message: "Staff approved successfully",
      staff,
    });
  } catch (err) {
    console.error("Error approving staff:", err);
    res.status(500).json({ error: "Server error" });
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

exports.checkApprove = async (req, res) => {
  try {

    const { email } = req.body;
    const approved = await Staff.findOne({ email, approved: true });
    if (!approved) {
      return res.status(400).json({
        message: false
      })

    }

    res.status(200).json({
      message: true
    })


  } catch (error) {

    res.status(500).json({
      message: "Internal server error",
      error
    })

  }
}