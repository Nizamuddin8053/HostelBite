
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const { mailSender } = require("../utils/mailSender");
const { body } = require("../mailTemplates/emailVerificationTemplate");
const { passwordUpdateTemplate } = require("../mailTemplates/passwordUpdateTemplate");
const Student = require("../models/Student");
const Staff = require("../models/Staff");
const Admin = require("../models/Management");




exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;


    const existingStudent = await Student.findOne({ email });
    const existingStaff = await Staff.findOne({ email });
    const existingAdmin = await Admin.findOne({ email });

    console.log(existingStudent, existingStaff, existingAdmin);

    if (existingStudent || existingStaff || existingAdmin) {
      return res.status(409).json({
        message: "User already exist with this email",
      })
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,

    });



    const hashedOtp = await bcrypt.hash(otp, 10);

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // delete old OTP if exists
    await OTP.deleteMany({ email });

    await OTP.create({
      email,
      otp: hashedOtp,
      expiresAt,
    });



    const htmlBody = body(otp);

    mailSender(
      "Email verification from HostelBite",
      email,
      htmlBody
    )

    res.json({ message: "OTP sent successfully" });

  } catch (error) {
    console.log("error while sending mail:", error);
    res.status(500).json({
      message: "server error while sending email"
    })
  }
};




exports.verifyOtp = async (req, res) => {
  const  { email, otp } = req.body;

  

  const record = await OTP.findOne({ email });

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
  const isMatch = await bcrypt.compare(otp, record.otp);

  if (!isMatch) {
    record.attempts += 1;
    await record.save();

    return res.status(400).json({
      message: `Invalid OTP. Attempts left: ${5 - record.attempts}`,
    });
  }

  //  success
  await OTP.deleteMany({ email });

  return res.status(200).json({ message: "OTP verified successfully" });

};


// forgot password send mail

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  

  const existingStudent = await Student.findOne({ email });
  const existingStaff = await Staff.findOne({ email });
  const existingAdmin = await Admin.findOne({ email });


  

  if (!existingStudent && !existingStaff && !existingAdmin) {
    return res.status(400).json({
      message: "User not found",
    })
  }

  try {
    const password = otpGenerator.generate(8, {
      upperCaseAlphabets: true,
      lowerCaseAlphabets: true,
      specialChars: true,

    });


    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingStudent) {
      await Student.findOneAndUpdate(
        { email: email },
        { password: hashedPassword },
        { new: true, runValidators: true },
      )
    } else if (existingStaff) {
      await Staff.findOneAndUpdate(
        { email: email },
        { password: hashedPassword },
        { new: true, runValidators: true },
      )
    } else if (existingAdmin) {
      await Admin.findOneAndUpdate(
        { email: email },
        { password: hashedPassword },
        { new: true, runValidators: true },
      )
    }

    const htmlBody = passwordUpdateTemplate(password);

    mailSender(
      "Password Change mail",
      email,
      htmlBody
    )

    res.status(200).json({
      message: "password updated successfully",
    })

  } catch (error) {
    res.status(500).json({
      message: "Internel Server Error"
    })
  }

}