const Management = require("../../models/Management");
const Student = require("../../models/Student");
const Staff = require("../../models/Staff");
exports.getUserByEmail = async (req, res) => {
  try {
    let user;
    if (req.user.role === "staff") {
      user = await Staff.findById(req.user.id).select("-password");
    } else if (req.user.role === "student") {
      user = await Student.findById(req.user.id).select("-password");
    } else if (req.user.role === "admin") {
      user = await Management.findById(req.user.id).select("-password");
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching current user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};