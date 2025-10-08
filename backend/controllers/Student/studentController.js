const db = require("../../config/Database");  // MySQL connection

// ✅ Get all students
exports.getAllStudents = (req, res) => {
    const sql = "SELECT student_id, name, email, room_number FROM STUDENT";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: "DB Error", error: err });
        res.status(200).json(results);
    });
};

// ✅ Get student by ID
exports.getStudentById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT student_id, name, email, room_number FROM STUDENT WHERE student_id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: "DB Error", error: err });
        if (results.length === 0) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(results[0]);
    });
};

// ✅ Update student profile
exports.updateStudent = (req, res) => {
    const { id } = req.params;
    const { name, email, room_number } = req.body;

    const sql = "UPDATE STUDENT SET name = ?, email = ?, room_number = ? WHERE student_id = ?";
    db.query(sql, [name, email, room_number, id], (err, result) => {
        if (err) return res.status(500).json({ message: "DB Error", error: err });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Student not found" });
        res.status(200).json({ message: "Student updated successfully" });
    });
};

// ✅ Delete student
exports.deleteStudent = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM STUDENT WHERE student_id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "DB Error", error: err });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Student not found" });
        res.status(200).json({ message: "Student deleted successfully" });
    });
};
