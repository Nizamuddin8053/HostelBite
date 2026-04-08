const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const Student = require("../models/Student");
const Staff = require("../models/Staff");
const Management = require("../models/Management");

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

    //  Validation
    if (!name || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        message: "Password not matched",
      });
    }


    // Check if user already exists
    let existingUser;
    if (role === "student") {
      existingUser = await Student.findOne({ email });
    } else if (role === "staff") {
      existingUser = await Staff.findOne({ email });
    } else {
      existingUser = await Management.findOne({ email });
    }

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    

    // Role-based creation
    if (role === "student") {
      
      if (!roomNumber || !course || !year) {
        
        return res.status(400).json({
          message: "All student fields required",
        });
      }

      const student = await Student.create({
        name,
        email,
        password: hashedPassword,
        roomNumber,
        course,
        year,
      });

      return res.status(201).json({
        message: "Student registered",
        studentId: student._id,
      });
    }

    else if (role === "staff") {
      if (!staffRole) {
        return res.status(400).json({
          message: "Fill staff role",
        });
      }

      const staff = await Staff.create({
        name,
        role: staffRole,
        email,
        password: hashedPassword,
        salaryAmount: 0,
      });

      return res.status(201).json({
        message: "Staff registered",
        staffId: staff._id,
      });
    }

    else if (role === "admin") {
      const admin = await Management.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "Admin registered",
        adminId: admin._id,
      });
    }

    else {
      return res.status(400).json({ message: "Invalid role" });
    }

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


// login controller

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password and role required",
      });
    }

   

    let user;

    // Find user based on role
    if (role === "student") {
      user = await Student.findOne({ email });
    } 
    else if (role === "staff") {
      user = await Staff.findOne({ email });
    } 
    else if (role === "admin") {
      user = await Management.findOne({ email });
    } 
    else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch =  bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role, fullName: user.name, },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      role,    // no need to send separately these details in res because I have encoded 
      token,   // these details using jwt.sign() whenever I will need I can decode all details using token
      fullName: user.name,    // best practice to send in user:{role, token, fullName} object 
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};