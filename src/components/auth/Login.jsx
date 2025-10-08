import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    localStorage.clear();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
    });

 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // when we are log in add token and role to localstorage


            console.log("✅ Login response:", response.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            alert("Login successful!");
            navigate("/dashboard");


        } catch (error) {
            console.error("❌ Login error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Login failed!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-5"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    Login
                </h2>

                {/* Email */}
                <div>
                    <label className="block mb-1 text-gray-600 font-medium">Email</label>
                    <input
                        type="email"
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
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
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

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
