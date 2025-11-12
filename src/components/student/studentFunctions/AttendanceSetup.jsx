import React, { useState, useEffect } from "react";

const AttendanceSetup = ({ onSave }) => {
    const [details, setDetails] = useState({
        student_id: "",
        menu_id: "",
        meal_type: "",
    });

    //  Load saved data (if exists) when component mounts
    useEffect(() => {
        const savedDetails = localStorage.getItem("studentDetails");
        if (savedDetails) {
            setDetails(JSON.parse(savedDetails));
        }
    }, []);

    // 📦 Handle input changes
    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    // 💾 Save details to localStorage
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("studentDetails", JSON.stringify(details));
        onSave && onSave(details); // pass details to parent if needed
        alert("Attendance setup saved!");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>🧾 Mess Attendance Setup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="student_id"
                    placeholder="Student ID"
                    value={details.student_id}
                    onChange={handleChange}
                    required
                />
                <br /><br />
                <input
                    type="text"
                    name="menu_id"
                    placeholder="Menu ID"
                    value={details.menu_id}
                    onChange={handleChange}
                    required
                />
                <br /><br />
                <input
                    type="text"
                    name="meal_type"
                    placeholder="Meal Type (breakfast/lunch/snacks/dinner)"
                    value={details.meal_type}
                    onChange={handleChange}
                    required
                />
                <br /><br />
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#4F46E5",
                        color: "white",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Save Details
                </button>
            </form>
        </div>
    );
};

export default AttendanceSetup;
