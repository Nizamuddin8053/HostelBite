const Student = require("../../models/Student");
const Menu = require("../../models/Menu");

// mark attendance
exports.markAttendance = async (req, res) => {
  try {
    const { student_id, menu_id, meal_type, token } = req.body;

    if (!student_id || !menu_id || !meal_type || !token) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const date = new Date().toISOString().split("T")[0];

    // Find student
    const student = await Student.findById(student_id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if already marked
    const alreadyMarked = student.attendance.find(
      (a) =>
        a.date.toISOString().split("T")[0] === date &&
        a.mealType === meal_type
    );

    if (alreadyMarked) {
      return res.status(200).json({ message: "Attendance already marked" });
    }

    // Add attendance
    student.attendance.push({
      date,
      mealType: meal_type,
      status: "present",
      menuId: menu_id,
    });

    await student.save();

    res.status(201).json({ message: "Attendance marked successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


// get all attendance

exports.getAllAttendance = async (req, res) => {
  try {
    const students = await Student.find().populate("attendance.menuId");

    const allAttendance = [];

    students.forEach((student) => {
      student.attendance.forEach((att) => {
        allAttendance.push({
          studentName: student.name,
          date: att.date,
          mealType: att.mealType,
          status: att.status,
          menuItems: att.menuId?.items || null,
        });
      });
    });

    res.status(200).json(allAttendance);

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// get attendance of one student 

exports.getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId).populate("attendance.menuId");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const attendance = student.attendance.map((att) => ({
      date: att.date,
      mealType: att.mealType,
      status: att.status,
      menuItems: att.menuId?.items || null,
    }));

    res.status(200).json(attendance);

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// update attendance 

exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params; // attendance subdocument id
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const student = await Student.findOne({
      "attendance._id": id,
    });

    if (!student) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    const attendance = student.attendance.id(id);
    attendance.status = status;

    await student.save();

    res.status(200).json({ message: "Attendance updated successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// delete attendance 

exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findOne({
      "attendance._id": id,
    });

    if (!student) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    student.attendance = student.attendance.filter(
      (att) => att._id.toString() !== id
    );

    await student.save();

    res.status(200).json({ message: "Attendance deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};