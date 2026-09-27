const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const Student = require("../models/Student");
const Staff = require("../models/Staff");
const Management = require("../models/Management");
const OTP = require("../models/OTP");
const { emailFilter } = require("../utils/emailFilter");

// signup

exports.signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      role,
      roomNumber,
      staffRole,
      course,
      year,
    } = req.body;

    if (!name || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const normalizedName = typeof name === "string" ? name.trim() : "";
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    if (!normalizedName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ message: "Enter a valid name and email address" });
    }

    if (
      typeof password !== "string" ||
      password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return res.status(400).json({ message: "Password must be 8 or more characters and no more than 72 UTF-8 bytes" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password not matched",
      });
    }

    if (role === "admin") {
      return res.status(403).json({
        message: "Administrator accounts must be provisioned by an existing administrator",
      });
    }

    if (!["student", "staff"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    if (role === "student" && (!roomNumber || !course || !year)) {
      return res.status(400).json({ message: "All student fields required" });
    }
    if (role === "staff" && !staffRole) {
      return res.status(400).json({ message: "Fill staff role" });
    }

    const [existingStudent, existingStaff, existingAdmin] = await Promise.all([
      Student.findOne(emailFilter(normalizedEmail)),
      Staff.findOne(emailFilter(normalizedEmail)),
      Management.findOne(emailFilter(normalizedEmail)),
    ]);
    if (existingStudent || existingStaff || existingAdmin) {
      return res.status(409).json({ message: "User already exists" });
    }

    const verifiedEmail = await OTP.findOneAndDelete({
      email: normalizedEmail,
      purpose: "signup",
      verifiedAt: { $ne: null },
      expiresAt: { $gt: new Date() },
    });
    if (!verifiedEmail) {
      return res.status(403).json({ message: "Verify your email address before signing up" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "student") {
      const student = await Student.create({
        name: normalizedName,
        email: normalizedEmail,
        password: hashedPassword,
        roomNumber,
        course,
        year,
      });

      return res.status(201).json({
        message: "Student registration submitted. Your account is pending administrator approval.",
        studentId: student._id,
      });
    } else {
      const staff = await Staff.create({
        name: normalizedName,
        role: staffRole,
        email: normalizedEmail,
        password: hashedPassword,
        salaryAmount: 0,
      });

      return res.status(201).json({
        message: "Staff registration submitted. Your account is pending administrator approval.",
        staffId: staff._id,
      });
    }

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "User already exists" });
    }
    console.error("Signup failed:", error);
    res.status(500).json({ message: "Unable to create account" });
  }
};


// login controller

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!normalizedEmail || typeof password !== "string" || !password || !role) {
      return res.status(400).json({
        message: "Email, password and role required",
      });
    }

   

    let user;

    if (role === "student") {
      user = await Student.findOne(emailFilter(normalizedEmail)).select("+password");
    } 
    else if (role === "staff") {
      user = await Staff.findOne(emailFilter(normalizedEmail)).select("+password");
    } 
    else if (role === "admin") {
      user = await Management.findOne(emailFilter(normalizedEmail)).select("+password");
    } 
    else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (role !== "admin" && !user.approved) {
      return res.status(403).json({
        message: "Your account is awaiting administrator approval",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured");
      return res.status(500).json({ message: "Authentication service is not configured" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), role, fullName: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      role,
      token,
      fullName: user.name,
    });

  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: "Unable to log in" });
  }
};