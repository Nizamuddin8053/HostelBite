import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        room_number: "",
        staffRole: "",
        course: "",
        year: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ✅ Email validation regex
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // ✅ Password strength checker
    const isStrongPassword = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword, role } = formData;

        // --- Basic validations ---
        if (!email || !password || !confirmPassword) {
            alert("Please fill all required fields!");
            return;
        }

        if (!isValidEmail(email)) {
            alert("Please enter a valid email address!");
            return;
        }

        if (!isStrongPassword(password)) {
            alert(
                "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
            );
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // --- Generate OTP for email verification (simulation) ---
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log("OTP for email verification:", otp);

        try {
            const response = await axios.post(
                "http://localhost:4000/api/auth/signup",
                formData
            );

            console.log("✅ Signup successful:", response.data);
            alert("Signup successful! You can now log in.");
            navigate("/login");
        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Signup failed!");
        }

        console.log("Form Submitted:", formData);
    };

    const { role } = formData;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-5"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    Signup Form
                </h2>

                {/* Name */}
                <div>
                    <label className="block mb-1 text-gray-600 font-medium">Name</label>
                    <input
                        type="text"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 text-gray-600 font-medium">Email</label>
                    <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block mb-1 text-gray-600 font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Must contain 8+ chars, uppercase, lowercase, number & symbol.
                    </p>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block mb-1 text-gray-600 font-medium">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        required
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Role Dropdown */}
                <div>
                    <label className="block mb-1 text-gray-600 font-medium">Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">Select role</option>
                        <option value="student">Student</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* Conditional Inputs */}
                {role === "student" && (
                    <div>
                        <div>
                            <label className="block mb-1 text-gray-600 font-medium">
                                Room Number
                            </label>
                            <input
                                type="text"
                                name="room_number"
                                value={formData.room_number}
                                onChange={handleChange}
                                placeholder="Enter room number"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block mb-1 text-gray-600 font-medium">
                                Course
                            </label>
                            <select
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Select course</option>
                                <option value="MCA">MCA</option>
                                <option value="Btech">B.Tech</option>
                                <option value="Mtech">M.Tech</option>
                            </select>
                        </div>

                        {/* Year selection based on course */}
                        {formData.course && (
                            <div className="mt-4">
                                <label className="block mb-1 text-gray-600 font-medium">
                                    Year
                                </label>
                                <select
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="">Choose your year</option>
                                    {formData.course === "Btech" && (
                                        <>
                                            <option value="1">1st year</option>
                                            <option value="2">2nd year</option>
                                            <option value="3">3rd year</option>
                                            <option value="4">4th year</option>
                                        </>
                                    )}
                                    {formData.course === "MCA" && (
                                        <>
                                            <option value="1">1st year</option>
                                            <option value="2">2nd year</option>
                                            <option value="3">3rd year</option>
                                        </>
                                    )}
                                    {formData.course === "Mtech" && (
                                        <>
                                            <option value="1">1st year</option>
                                            <option value="2">2nd year</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        )}
                    </div>
                )}

                {role === "staff" && (
                    <div>
                        <label className="block mb-1 text-gray-600 font-medium">
                            Staff Role
                        </label>
                        <input
                            type="text"
                            name="staffRole"
                            value={formData.staffRole}
                            onChange={handleChange}
                            placeholder="Enter staff role"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignupForm;
