import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const MarkAttendance = () => {
    const location = useLocation();
    const [message, setMessage] = useState("Verifying your attendance...");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (!token) {
            setMessage("Invalid or missing attendance token.");
            return;
        }

        // 👇 Call backend to verify and mark attendance
        axios
            .get(`http://localhost:4000/api/attendance/verify?token=${token}`)
            .then((res) => {
                setMessage(res.data.message || "Attendance marked successfully!");
            })
            .catch((err) => {
                console.error(err);
                setMessage("Failed to verify attendance.");
            });
    }, [location]);

    return (
        <div className="p-6 bg-white rounded-2xl shadow-md text-center">
            <h2 className="text-xl font-semibold mb-3">Attendance Verification</h2>
            <p className="text-gray-700">{message}</p>
        </div>
    );
};

export default MarkAttendance;
