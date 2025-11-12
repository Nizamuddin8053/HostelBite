const db = require("../../config/Database");  // MySQL connection

// ✅ Get all students
exports.getAllStudents = (req, res) => {
    const sql = "SELECT student_id, name, email, course, year, room_number FROM STUDENT";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: "DB Error", error: err });
        res.status(200).json(results);
    });
};

// ✅ Get student by ID
exports.getStudentById = (req, res) => {
    const {id } = req.params;
    student_id = id;
    const sql = "SELECT student_id, name, email, room_number FROM STUDENT WHERE student_id = ?";
    db.query(sql, [student_id], (err, results) => {
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
    const { student_id } = req.params;

    // Step 1: Delete all dependent records (in proper order)
    const deleteQueries = [
        { sql: "DELETE FROM attendance WHERE student_id = ?", name: "attendance" },
        { sql: "DELETE FROM complaints WHERE student_id = ?", name: "complaints" },
        { sql: "DELETE FROM feedback WHERE student_id = ?", name: "feedback" }, 
        { sql: "DELETE FROM invoice WHERE student_id = ?", name: "invoice" }, 
        { sql: "DELETE FROM notifications WHERE student_id = ?", name: "notifications" } 
    ];

    const runDeletions = (index = 0) => {
        if (index >= deleteQueries.length) {
            // Step 2: Delete the student after dependents are gone
            const deleteStudentSQL = "DELETE FROM student WHERE student_id = ?";
            return db.query(deleteStudentSQL, [student_id], (err, result) => {
                if (err) {
                    console.error("❌ Error deleting student:", err);
                    return res.status(500).json({ message: "Error deleting student", error: err });
                }
                if (result.affectedRows === 0)
                    return res.status(404).json({ message: "Student not found" });

                res.status(200).json({ message: "✅ Student deleted successfully" });
            });
        }

        const { sql, name } = deleteQueries[index];
        db.query(sql, [student_id], (err) => {
            if (err) {
                console.error(`❌ Error deleting from ${name}:`, err);
                return res.status(500).json({ message: `Error deleting from ${name}`, error: err });
            }
            runDeletions(index + 1);
        });
    };

    runDeletions();
};


// Delete by course & year
exports.deleteByCourseAndYear = (req, res) => {
    const { course, year } = req.body;
    
    // Step 1: Get all affected student IDs
    const getStudentsSQL = "SELECT student_id FROM student WHERE course = ? AND year = ?";
    db.query(getStudentsSQL, [course, year], (err, students) => {
        if (err) {
            console.error("❌ Error fetching students:", err);
            return res.status(500).json({ message: "Error fetching students", error: err });
        }

        if (students.length === 0) {
            return res.status(404).json({ message: "No students found for the given course and year" });
        }

        const studentIds = students.map(s => s.student_id);
        console.log("Students to delete:", studentIds);

        // Step 2: Delete related records from dependent tables
        const deleteQueries = [
            { sql: "DELETE FROM attendance WHERE student_id = ?", name: "attendance" },
            { sql: "DELETE FROM complaints WHERE student_id = ?", name: "complaints" },
            { sql: "DELETE FROM feedback WHERE student_id = ?", name: "feedback" },
            { sql: "DELETE FROM invoice WHERE student_id = ?", name: "invoice" },
            { sql: "DELETE FROM notifications WHERE student_id = ?", name: "notifications" }
        ];

        const runDeletions = (index = 0) => {
            if (index >= deleteQueries.length) {
                // Step 3: Delete students after dependencies
                const deleteStudentsSQL = "DELETE FROM student WHERE course = ? AND year = ?";
                return db.query(deleteStudentsSQL, [course, year], (err2, result) => {
                    if (err2) {
                        console.error("❌ Error deleting students:", err2);
                        return res.status(500).json({ message: "Error deleting students", error: err2 });
                    }

                    res.status(200).json({ message: `✅ ${result.affectedRows} students deleted successfully` });
                });
            }

            const { sql, name } = deleteQueries[index];
            db.query(sql, [studentIds], (err) => {
                if (err) {
                    console.error(`❌ Error deleting from ${name}:`, err);
                    return res.status(500).json({ message: `Error deleting from ${name}`, error: err });
                }
                runDeletions(index + 1);
            });
        };

        runDeletions();
    });
};

