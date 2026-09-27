const { createHash, randomBytes } = require("crypto");
const Attendance = require("../../models/Attendance");
const QRToken = require("../../models/QRSchema");
const Student = require("../../models/Student");
const WeeklyMenu = require("../../models/Menu");

const QR_SESSION_DURATION_MS = 5 * 60 * 1000;
const MEAL_TYPES = ["breakfast", "lunch", "snacks", "dinner"];

const hashToken = (token) => createHash("sha256").update(token).digest("hex");

const getUtcDayStart = (date) => {
  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);
  return start;
};

exports.createQrSession = async (req, res) => {
  try {
    const { mealType } = req.body;
    if (!MEAL_TYPES.includes(mealType)) {
      return res.status(400).json({ message: "Select a valid meal type" });
    }

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + QR_SESSION_DURATION_MS);
    await QRToken.create({
      tokenHash: hashToken(token),
      mealType,
      expiresAt,
      createdBy: req.user.id,
    });

    res.status(201).json({
      token,
      mealType,
      expiresAt,
    });
  } catch (error) {
    console.error("Unable to create attendance QR session:", error);
    res.status(500).json({ message: "Unable to create attendance QR code" });
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const { token } = req.body;
    if (typeof token !== "string" || token.length !== 64) {
      return res.status(400).json({ message: "A valid attendance QR code is required" });
    }

    const now = new Date();
    const qrSession = await QRToken.findOne({
      tokenHash: hashToken(token),
      expiresAt: { $gt: now },
    });
    if (!qrSession) {
      return res.status(401).json({ message: "This attendance QR code is invalid or expired" });
    }

    const student = await Student.findById(req.user.id).select("_id approved");
    if (!student || !student.approved) {
      return res.status(403).json({ message: "An approved student account is required" });
    }

    const date = getUtcDayStart(now);
    const menu = await WeeklyMenu.findOne().sort({ createdAt: -1 }).select("_id");

    const attendance = await Attendance.create({
      student_id: student._id,
      ...(menu ? { menuId: menu._id } : {}),
      mealType: qrSession.mealType,
      date,
      status: "present",
    });

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Attendance has already been marked for this meal today",
      });
    }
    console.error("Unable to mark attendance:", error);
    res.status(500).json({ message: "Unable to mark attendance" });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const attendances = await Attendance.find()
      .populate("student_id", "name course year email")
      .populate("menuId", "weekStartDate")
      .sort({ date: -1, createdAt: -1 })
      .lean();

    const result = attendances.map((attendance) => ({
      studentName: attendance.student_id?.name || "N/A",
      course: attendance.student_id?.course || "N/A",
      year: attendance.student_id?.year || "N/A",
      email: attendance.student_id?.email || "N/A",
      day: attendance.date
        ? new Intl.DateTimeFormat("en", { weekday: "long", timeZone: "UTC" }).format(attendance.date)
        : "N/A",
      mealType: attendance.mealType || "N/A",
      status: attendance.status || "N/A",
      date: attendance.date || "N/A",
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Unable to fetch attendance:", error);
    res.status(500).json({ message: "Unable to fetch attendance" });
  }
};

const getAttendanceForStudent = async (studentId, res) => {
  try {
    const student = await Student.findById(studentId).select("name course year");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const attendances = await Attendance.find({ student_id: studentId })
      .sort({ date: -1, createdAt: -1 })
      .lean();

    res.status(200).json(attendances.map((attendance) => ({
      studentName: student.name,
      course: student.course,
      year: student.year,
      day: attendance.date
        ? new Intl.DateTimeFormat("en", { weekday: "long", timeZone: "UTC" }).format(attendance.date)
        : "N/A",
      mealType: attendance.mealType,
      status: attendance.status,
      date: attendance.date,
    })));
  } catch (error) {
    console.error("Unable to fetch student attendance:", error);
    res.status(500).json({ message: "Unable to fetch attendance" });
  }
};

exports.getAttendanceByStudent = (req, res) =>
  getAttendanceForStudent(req.params.student_id, res);

exports.getMyAttendance = (req, res) =>
  getAttendanceForStudent(req.user.id, res);
