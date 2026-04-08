const Student = require("../../models/Student");

//  Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find(
      {approved: true},
      "name email course year roomNumber"
    ).sort({createdAt: -1});

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "DB Error", error: err });
  }
};

//  Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(
      id,
      "name email roomNumber"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: "DB Error", error: err });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, roomNumber } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, email, roomNumber },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (err) {
    res.status(500).json({ message: "DB Error", error: err });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const { student_id } = req.params;

    const deleted = await Student.findByIdAndDelete({student_id});

    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    console.log("error is", err)
    res.status(500).json({ message: "internal server error", err });
  }
};


//  Delete by course & year
exports.deleteByCourseAndYear = async (req, res) => {
  try {
    const { course, year } = req.body;

    console.log("course ", course, "year is", year);

    // course MCA, mca , Mca regex treat same all 

    const result = await Student.deleteMany({
      course: { $regex: `^${course}$`, $options: "i" },
      year,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "No students found for the given course and year",
      });
    }

    res.status(200).json({
      message: ` ${result.deletedCount} students deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting students",
      error: err,
    });
  }
};


// search student controller

exports.searchStudents = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) return res.json([]);

    const students = await Student.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { course: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        {
          year: isNaN(q) ? undefined : Number(q), // ✅ FIX for year
        },
      ].filter(Boolean),
    })
      .limit(20)
      .select("name course year email");

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
