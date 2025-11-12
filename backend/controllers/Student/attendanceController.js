const db = require("../../config/Database");

// ✅ Mark attendance
exports.markAttendance = (req, res) => {
    const { student_id, menu_id, meal_type, token } = req.body;

    if (!student_id || !menu_id || !meal_type || !token) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const date = new Date().toISOString().split("T")[0];
    const status = "present";

    // Check if attendance already marked
    const checkQuery = `SELECT * FROM attendance WHERE student_id = ? AND date = ? AND meal_type = ?`;
    db.query(checkQuery, [student_id, date, meal_type], (err, result) => {
        if (err) return res.status(500).json({ message: "DB Error", error: err });

        if (result.length > 0) {
            return res.status(200).json({ message: "Attendance already marked" });
        }

        // Insert attendance
        const insertQuery = `INSERT INTO attendance (student_id, menu_id, date, meal_type, status, token)
                         VALUES (?, ?, ?, ?, ?, ?)`;

        db.query(insertQuery, [student_id, menu_id, date, meal_type, status, token], (err2, result2) => {
            if (err2) return res.status(500).json({ message: "DB Error", error: err2 });
            res.status(201).json({ message: "Attendance marked successfully", attendanceId: result2.insertId });
        });
    });
};


// ✅ Get all attendance records
exports.getAllAttendance = (req, res) => {
    const sql = `SELECT A.attendance_id, A.date, A.meal_type, A.status, 
                      S.name AS student_name, M.items AS menu_items
               FROM ATTENDANCE A
               JOIN STUDENT S ON A.student_id = S.student_id
               JOIN MENU M ON A.menu_id = M.menu_id`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: "DB Error", error: err });
        res.status(200).json(results);
    });
};

// ✅ Get attendance by student
exports.getAttendanceByStudent = (req, res) => {
    const { studentId } = req.params;
    const sql = `SELECT A.attendance_id, A.date, A.meal_type, A.status, M.items AS menu_items
               FROM ATTENDANCE A
               JOIN MENU M ON A.menu_id = M.menu_id
               WHERE A.student_id = ?`;
    db.query(sql, [studentId], (err, results) => {
        if (err) return res.status(500).json({ message: "DB Error", error: err });
        res.status(200).json(results);
    });
};

// ✅ Update attendance
exports.updateAttendance = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) return res.status(400).json({ message: "Status is required" });

    const sql = "UPDATE ATTENDANCE SET status = ? WHERE attendance_id = ?";
    db.query(sql, [status, id], (err, result) => {
        if (err) return res.status(500).json({ message: "DB Error", error: err });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Attendance record not found" });
        res.status(200).json({ message: "Attendance updated successfully" });
    });
};

// ✅ Delete attendance
exports.deleteAttendance = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM ATTENDANCE WHERE attendance_id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "DB Error", error: err });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Attendance record not found" });
        res.status(200).json({ message: "Attendance deleted successfully" });
    });
};
