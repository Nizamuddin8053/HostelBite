import React, { useState, useEffect } from "react";
import axios from "axios";

const SendNotification = () => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        targetType: "all", // all | single | group
        user_id: "",
        course: "",
        year: "",
        title: "",
        message: ""
    });

    // Fetch all students for dropdown
    useEffect(() => {
        axios.get("http://localhost:4000/api/students/getAll")
            .then(res => setStudents(res.data))
            .catch(err => console.error("Error fetching students:", err));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:4000/api/notification/createNotification", formData);
            alert(res.data.message || "Notification sent successfully!");
            setFormData({
                targetType: "all",
                user_id: "",
                course: "",
                year: "",
                title: "",
                message: ""
            });
        } catch (error) {
            console.error("Error sending notification:", error);
            alert("Failed to send notification");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    📢 Send Notification
                </h2>

                {/* Select Target Type */}
                <div className="mb-4">
                    <label className="font-medium block mb-1">Send To</label>
                    <select
                        name="targetType"
                        value={formData.targetType}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="all">All Students</option>
                        <option value="single">Particular Student</option>
                        <option value="group">By Course & Year</option>
                    </select>
                </div>

                {/* Single Student Selection */}
                {formData.targetType === "single" && (
                    <div className="mb-4">
                        <label className="font-medium block mb-1">Select Student</label>
                        <select
                            name="user_id"
                            value={formData.user_id}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        >
                            <option value="">Select Student</option>
                            {students.map((s) => (
                                <option key={s.student_id} value={s.student_id}>
                                    {s.name} ({s.course}-{s.year})
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Group Selection */}
                {formData.targetType === "group" && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="font-medium block mb-1">Course</label>
                            <input
                                type="text"
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                placeholder="e.g. MCA"
                            />
                        </div>
                        <div>
                            <label className="font-medium block mb-1">Year</label>
                            <input
                                type="text"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                placeholder="e.g. 2"
                            />
                        </div>
                    </div>
                )}

                {/* Title */}
                <div className="mb-4">
                    <label className="font-medium block mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        placeholder="Enter title"
                    />
                </div>

                {/* Message */}
                <div className="mb-4">
                    <label className="font-medium block mb-1">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        placeholder="Enter message"
                        rows="4"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
                >
                    Send Notification
                </button>
            </div>
        </div>
    );
};

export default SendNotification;
