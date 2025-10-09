
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
        
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        // First verify email by sending OTP to email
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log("OTP for email verification:", otp);

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }


        // store in database

        try {
            // Adjust the API URL based on your backend
            const response = await axios.post(
                "http://localhost:4000/api/auth/signup",
                formData
            );

            console.log("✅ Signup successful:", response.data);
            alert("Signup successful!");
            navigate("/login");
        } catch (error) {
            console.error(" Signup error:", error.response?.data || error.message);
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
                {(role !== "staff" || role === "") && (
                    <div>
                        <label className="block mb-1 text-gray-600 font-medium">
                            Name
                        </label>
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
                )}

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
                )}

                {role === "staff" && (
                    <>
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

                       
                    </>
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
