const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/Database");  // MySQL connection

// SIGNUP controller (already written above)
exports.signup = async (req, res) => {
    try {
        const { name, email, password,confirmPassword, role, room_number, staffRole, salary_amount } = req.body;

        if (!name || !email || !password || !confirmPassword || !role) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        if(password !== confirmPassword){
            return res.status(401).json({
                message:"password not matched",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === "student") {
            const sql = `INSERT INTO STUDENT (name, email, password, room_number) VALUES (?, ?, ?, ?)`;
            db.query(sql, [name, email, hashedPassword, room_number || null], (err, result) => {
                if (err) return res.status(500).json({ message: "DB Error", error: err });
                res.status(201).json({ message: "Student registered", studentId: result.insertId });
            });
        } else if (role === "staff") {
            const sql = `INSERT INTO STAFF (name, role, email, password, salary_amount) VALUES (?, ?, ?, ?, ?)`;
            db.query(sql, [name, staffRole || "general", email, hashedPassword, salary_amount || 0], (err, result) => {
                if (err) return res.status(500).json({ message: "DB Error", error: err });
                res.status(201).json({ message: "Staff registered", staffId: result.insertId });
            });
        } else if (role === "admin") {
            const sql = `INSERT INTO MANAGEMENT (name, email, password) VALUES (?, ?, ?)`;
            db.query(sql, [name, email, hashedPassword], (err, result) => {
                if (err) return res.status(500).json({ message: "DB Error", error: err });
                res.status(201).json({ message: "Admin registered", adminId: result.insertId });
            });
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// LOGIN controller
exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "Email, password and role required" });
        }

        let sql = "";
        if (role === "student") {
            sql = "SELECT * FROM STUDENT WHERE email = ?";
        } else if (role === "staff") {
            sql = "SELECT * FROM STAFF WHERE email = ?";
        } else if (role === "admin") {
            sql = "SELECT * FROM MANAGEMENT WHERE email = ?";
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }

        db.query(sql, [email], async (err, results) => {
            if (err) return res.status(500).json({ message: "DB Error", error: err });
            if (results.length === 0) return res.status(404).json({ message: "User not found" });

            const user = results[0];
            console.log(user);

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

            // Generate JWT
            const token = jwt.sign(
                { id: user[`${role}_id`] || user.staff_id || user.management_id, role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.status(200).json({
                message: "Login successful",
                role,
                token,
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
