
const otpGenerator = require("otp-generator");
const { createHash, randomBytes } = require("crypto");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const { mailSender } = require("../utils/mailSender.js");
const { body } = require("../mailTemplates/emailVerificationTemplate");
const Student = require("../models/Student");
const Staff = require("../models/Staff");
const Admin = require("../models/Management");
const { emailFilter } = require("../utils/emailFilter");




exports.sendOtp = async (req, res) => {
  try {
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const purpose = req.body.purpose || "signup";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Enter a valid email address" });
    }
    if (!["signup", "password-reset"].includes(purpose)) {
      return res.status(400).json({ message: "Invalid verification purpose" });
    }

    const [existingStudent, existingStaff, existingAdmin] = await Promise.all([
      Student.findOne(emailFilter(email)),
      Staff.findOne(emailFilter(email)),
      Admin.findOne(emailFilter(email)),
    ]);
    const accountExists = Boolean(
      (existingStudent && (purpose !== "password-reset" || existingStudent.approved)) ||
      (existingStaff && (purpose !== "password-reset" || existingStaff.approved)) ||
      existingAdmin
    );

    if (purpose === "signup" && (existingStudent || existingStaff || existingAdmin)) {
      return res.status(409).json({ message: "An account already exists with this email" });
    }
    if (purpose === "password-reset" && !accountExists) {
      return res.status(200).json({
        message: "If an approved account exists for this email, a verification code has been sent",
      });
    }

    const recentOtp = await OTP.findOne({
      email,
      purpose,
      createdAt: { $gt: new Date(Date.now() - 60 * 1000) },
    }).select("_id");
    if (recentOtp) {
      return res.status(429).json({ message: "Please wait before requesting another verification code" });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,

    });



    const hashedOtp = await bcrypt.hash(otp, 10);

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OTP.deleteMany({ email });

    await OTP.create({
      email,
      otp: hashedOtp,
      expiresAt,
      purpose,
    });



    const htmlBody = body(otp);

    await mailSender(
      "Email verification from HostelBite",
      email,
      htmlBody
    );

    res.status(200).json({
      message: purpose === "signup"
        ? "OTP sent successfully"
        : "If an approved account exists for this email, a verification code has been sent",
    });

  } catch (error) {
    console.error("Unable to send verification email:", error);
    res.status(500).json({
      message: "server error while sending email"
    })
  }
};




exports.verifyOtp = async (req, res) => {
  try {
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const { otp } = req.body;
    const purpose = req.body.purpose || "signup";
    if (!email || typeof otp !== "string" || !["signup", "password-reset"].includes(purpose)) {
      return res.status(400).json({ message: "Email, code, and a valid purpose are required" });
    }

    const record = await OTP.findOne({ email, purpose }).select("+otp +resetTokenHash");

    // Check if record exists
    if (!record) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    // expiry check
    if (record.expiresAt < new Date()) {
      await OTP.deleteMany({ email });
      return res.status(400).json({ message: "OTP expired" });
    }

    // too many attempts 
    if (record.attempts >= 5) {
      await OTP.deleteMany({ email });
      return res.status(400).json({ message: "Too many attempts. Try again later." });
    }

    //  otp validation
    if (record.verifiedAt && purpose === "password-reset") {
      return res.status(400).json({ message: "This code has already been used; request a new one" });
    }

    const isMatch = await bcrypt.compare(otp, record.otp);

    if (!isMatch) {
      record.attempts += 1;
      await record.save();

      return res.status(400).json({
        message: `Invalid OTP. Attempts left: ${5 - record.attempts}`,
      });
    }

    record.verifiedAt = new Date();
    if (purpose === "password-reset") {
      const resetToken = randomBytes(32).toString("hex");
      record.resetTokenHash = createHash("sha256").update(resetToken).digest("hex");
      await record.save();
      return res.status(200).json({
        message: "OTP verified successfully",
        resetToken,
      });
    }

    await record.save();
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Unable to verify OTP:", error);
    return res.status(500).json({
      message: "Unable to verify code",
    });
  }
};


// forgot password send mail

exports.forgotPassword = async (req, res) => {
  try {
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const { resetToken, password, confirmPassword } = req.body;
    if (!email || typeof resetToken !== "string" || resetToken.length !== 64) {
      return res.status(400).json({ message: "A verified password-reset code is required" });
    }
    if (
      typeof password !== "string" ||
      password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return res.status(400).json({ message: "Password must be 8 or more characters and no more than 72 UTF-8 bytes" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const resetRecord = await OTP.findOneAndDelete({
      email,
      purpose: "password-reset",
      verifiedAt: { $ne: null },
      resetTokenHash: createHash("sha256").update(resetToken).digest("hex"),
      expiresAt: { $gt: new Date() },
    });
    if (!resetRecord) {
      return res.status(401).json({ message: "Password-reset authorization is invalid or expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedAccount = await Student.findOneAndUpdate(
      { ...emailFilter(email), approved: true },
      { password: hashedPassword },
      { new: true, runValidators: true }
    ) || await Staff.findOneAndUpdate(
      { ...emailFilter(email), approved: true },
      { password: hashedPassword },
      { new: true, runValidators: true }
    ) || await Admin.findOneAndUpdate(
      emailFilter(email),
      { password: hashedPassword },
      { new: true, runValidators: true }
    );

    if (!updatedAccount) {
      return res.status(404).json({ message: "Approved account not found" });
    }

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Unable to update password:", error);
    return res.status(500).json({ message: "Unable to update password" });
  }
};