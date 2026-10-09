import React, { useState, useEffect } from "react";
import axios from "axios";
import showToast from "../../../../utils/showToast";
import { TOAST_TYPE } from "../../../../utils/constants";

const SendNotification = () => {
    const [students, setStudents] = useState([]);
    const [staff, setStaff] = useState([]);
    const [formData, setFormData] = useState({
        targetType: "all",
        student_id: "",
        staff_id: "",
        course: "",
        year: "",
        title: "",
        message: ""
    });

    useEffect(() => {
        const fetchRecipients = async () => {
            try {
                const [studentsResponse, staffResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_API_URL}/api/students/getAll`),
                    axios.get(`${process.env.REACT_APP_API_URL}/api/staff/getAllStaff`)
                ]);
                setStudents(studentsResponse.data);
                setStaff(staffResponse.data);
            } catch (error) {
                console.error("Error fetching notification recipients:", error);
                showToast(
                    error.response?.data?.message || "Unable to load notification recipients.",
                    TOAST_TYPE.ERROR
                );
            }
        };

        fetchRecipients();
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
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/notification/createNotification`, formData);
            showToast(
                res.data?.affected
                    ? `Notification sent to ${res.data.affected} recipient(s).`
                    : "There are no approved recipients for this notification.",
                res.data?.affected ? TOAST_TYPE.SUCCESS : TOAST_TYPE.INFO
            );
            setFormData({
                targetType: "all",
                student_id: "",
                staff_id: "",
                course: "",
                year: "",
                title: "",
                message: ""
            });
        } catch (error) {
            console.error("Error sending notification:", error);
            showToast(
                error.response?.data?.error || "Unable to send notification.",
                TOAST_TYPE.ERROR
            );
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    📢 Send Notification
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-1 block font-medium" htmlFor="notification-target">Send To</label>
                        <select
                            id="notification-target"
                            name="targetType"
                            value={formData.targetType}
                            onChange={handleChange}
                            className="w-full rounded border p-2"
                        >
                            <option value="all">All Students</option>
                            <option value="single">Particular Student</option>
                            <option value="group">By Course & Year</option>
                            <option value="allStaff">All Staff</option>
                            <option value="singleStaff">Particular Staff Member</option>
                        </select>
                    </div>

                    {formData.targetType === "single" && (
                        <div className="mb-4">
                            <label className="mb-1 block font-medium" htmlFor="notification-student">Select Student</label>
                            <select
                                id="notification-student"
                                name="student_id"
                                value={formData.student_id}
                                onChange={handleChange}
                                required
                                className="w-full rounded border p-2"
                            >
                                <option value="">Select Student</option>
                                {students.map((student) => (
                                    <option key={student._id} value={student._id}>
                                        {student.name} ({student.course}-{student.year})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {formData.targetType === "singleStaff" && (
                        <div className="mb-4">
                            <label className="mb-1 block font-medium" htmlFor="notification-staff">Select Staff Member</label>
                            <select
                                id="notification-staff"
                                name="staff_id"
                                value={formData.staff_id}
                                onChange={handleChange}
                                required
                                className="w-full rounded border p-2"
                            >
                                <option value="">Select Staff Member</option>
                                {staff.map((member) => (
                                    <option key={member._id} value={member._id}>
                                        {member.name} ({member.email})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {formData.targetType === "group" && (
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1 block font-medium" htmlFor="notification-course">Course</label>
                                <input
                                    id="notification-course"
                                    type="text"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    className="w-full rounded border p-2"
                                    placeholder="e.g. MCA"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-1 block font-medium" htmlFor="notification-year">Year</label>
                                <input
                                    id="notification-year"
                                    type="text"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    className="w-full rounded border p-2"
                                    placeholder="e.g. 2"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="mb-1 block font-medium" htmlFor="notification-title">Title</label>
                        <input
                            id="notification-title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded border p-2"
                            placeholder="Enter title"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-1 block font-medium" htmlFor="notification-message">Message</label>
                        <textarea
                            id="notification-message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full rounded border p-2"
                            placeholder="Enter message"
                            rows="4"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
                    >
                        Send Notification
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendNotification;
