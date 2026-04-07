const Student = require("../../models/Student");
const Attendance = require("../../models/Attendance");


// mark attendance
exports.markAttendance = async (req, res) => {
  try {
    const { email, menu_id, meal_type ,token } = req.body;

    // 1. Validate input
    if (!email || !menu_id || !meal_type || !token) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const validToken = await QRToken.findOne({ token });

    if (!validToken) {
      return res.status(401).json({ message: "Invalid QR" });
    }

    if (new Date() > validToken.expiresAt) {
      return res.status(401).json({ message: "QR expired" });
    }


    const today = new Date().toISOString().split("T")[0];

    // 2. Check student exists
    const student = await Student.findOne({email});
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 3. (Optional) Validate token (if you're using QR or daily token)
    // Example:
    // if (token !== process.env.MESS_TOKEN) {
    //   return res.status(401).json({ message: "Invalid token" });
    // }

    // 4. Prevent duplicate attendance (same student + same meal + same date)
    const alreadyMarked = await Attendance.findOne({
      email,
      mealType: meal_type,
      date: today,
    });

    if (alreadyMarked) {
      return res.status(400).json({
        message: `Attendance already marked for ${meal_type}`,
      });
    }

    // 5. Create attendance
    const attendance = await Attendance.create({
      email_student: email,
      menuId: menu_id,
      mealType: meal_type,
      date: today,
      status: "Present",
    });

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// get all attendance

exports.getAllAttendance = async (req, res) => {
  try {
    const allAttendances = await Attendance.find()
      .populate("student_id", "name course year email")
      .populate("menuId", "day mealType")
      .sort({ createdAt: -1 }).lean();

    const result = allAttendances.map((attendance) => {
      return {
        studentName: attendance.student_id?.name || "N/A",
        course: attendance.student_id?.course || "N/A",
        year: attendance.student_id?.year || "N/A",
        email: attendance.student_id?.email || "N/A",
        day: attendance.menuId?.day || "N/A",
        mealType: attendance.menuId?.mealType || "N/A",
        status: attendance.status || "N/A",
        date: attendance.date || "N/A",
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// get attendance of one student 

exports.getAttendanceByStudent = async (req, res) => {
  try {
    const { student_id } = req.params;

    const student = await Student.findById(student_id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const attendances = await Attendance.find({ student_id: student_id }).populate("student_id", "name course year").
      populate("menuId", "day mealType").sort({ createdAt: -1 });

    const result = attendances.map((a) => {
      return {
        studentName: a.student_id?.name,
        course: a.student_id?.course,
        year: a.student_id?.year,
        day: a.menuId?.day,
        mealType: a.menuId?.mealType,
      }
    })

    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// update attendance

// exports.updateAttendance = async (req, res) => {
//   try {
//     const { id } = req.params; // attendance subdocument id
//     const { status } = req.body;

//     if (!status) {
//       return res.status(400).json({ message: "Status is required" });
//     }

//     const student = await Student.findOne({
//       "attendance._id": id,
//     });

//     if (!student) {
//       return res.status(404).json({ message: "Attendance not found" });
//     }

//     const attendance = student.attendance.id(id);
//     attendance.status = status;

//     await student.save();

//     res.status(200).json({ message: "Attendance updated successfully" });

//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error });
//   }
// };

// // delete attendance

// exports.deleteAttendance = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const student = await Student.findOne({
//       "attendance._id": id,
//     });

//     if (!student) {
//       return res.status(404).json({ message: "Attendance not found" });
//     }

//     student.attendance = student.attendance.filter(
//       (att) => att._id.toString() !== id
//     );

//     await student.save();

//     res.status(200).json({ message: "Attendance deleted successfully" });

//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error });
//   }
// };