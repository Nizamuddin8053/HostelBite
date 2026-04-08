const Management = require("../../models/Management");
const Student = require("../../models/Student");
const Staff = require("../../models/Staff");
const bcrypt = require("bcrypt");


// Get staff by ID
exports.getUserByEmail = async (req, res) => {
  try {
    const { email, role, password } = req.body;

    let user;
    if (role === "staff") {
      user = await Staff.findOne({ email });
    } else if (role === "student") {
      user = await Student.findOne({ email });
    } else if (role === "admin") {
      user = await Management.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    user.password = undefined;

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};