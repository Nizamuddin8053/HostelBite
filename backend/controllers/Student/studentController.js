const Student = require("../../models/Student");

//  Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find(
      {},
      "name email course year roomNumber"
    );

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

    const deleted = await Student.findByIdAndDelete(student_id);

    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student", error: err });
  }
};


//  Delete by course & year
exports.deleteByCourseAndYear = async (req, res) => {
  try {
    const { course, year } = req.body;

    const result = await Student.deleteMany({ course, year });

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

