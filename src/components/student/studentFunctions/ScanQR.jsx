import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import AttendanceSetup from "./AttendanceSetup";

const ScanQR = () => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState("");
    const [hasDetails, setHasDetails] = useState(
        !!localStorage.getItem("studentDetails")
    );

    useEffect(() => {
        const token = searchParams.get("token");
        if (!token || !hasDetails) return;

        const markAttendance = async () => {
            try {
                const saved = JSON.parse(localStorage.getItem("studentDetails"));
                console.log(saved);

                const payload = {
                    student_id: saved.student_id,
                    menu_id: saved.menu_id,
                    meal_type: saved.meal_type,
                    date: new Date().toISOString().split("T")[0],
                    status: "present",
                    token, // from QR
                };

                const res = await axios.post(
                    "http://localhost:4000/api/attendance/mark",
                    payload
                );

                setMessage("✅ " + res.data.message);
            } catch (error) {
                console.error("Error:", error);
                setMessage("❌ " + (error.response?.data?.message || "Failed to mark attendance"));
            }
        };

        markAttendance();
    }, [hasDetails, searchParams]);

    if (!hasDetails)
        return <AttendanceSetup onSave={() => setHasDetails(true)} />;

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2> Mess Attendance</h2>
            <p>{message || "⏳ Verifying your attendance..."}</p>
        </div>
    );
};

export default ScanQR;
