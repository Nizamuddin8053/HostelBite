import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner";
import { EyeOff, Eye } from "lucide-react";
import showToast from "../../utils/showToast";
import {TOAST_TYPE } from "../../utils/constants";



// login form 
const LoginForm = () => {

    // localStorage.clear();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);



    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
    });


    //  Email validation regex
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);





    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const updatePasswordHandler = () => {
        navigate("/update-password");

    }


    const getUser = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/common/getUser`,
                {
                    email: formData.email,
                    role: formData.role,
                    password: formData.password,
                }
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        // email validation

        if(!isValidEmail(formData.email)){
            showToast("Enter a valid email address", TOAST_TYPE.ERROR);
            setLoading(false);
            return;
        }


        setLoading(true);

        try {
            const userData = await getUser();

            if (!userData) {
                showToast("Invalid credentials", TOAST_TYPE.ERROR);
                setLoading(false);
                return;
            }

            //  Approval check
            // if (
            //     formData.role === ACCOUNT_TYPE.STAFF ||
            //     formData.role === ACCOUNT_TYPE.STUDENT
            // ) {
            //     if (!userData.approved) {
            //         showToast(
            //             "Admin will approve you soon. You’ll receive an email notification.",
            //             TOAST_TYPE.INFO
            //         );
            //         setLoading(false);
            //         return;
            //     }
            // }

            //  Login API
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/login`,
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

            localStorage.setItem("token", response.data.token);

            showToast("Login successful!", TOAST_TYPE.SUCCESS);

            // Redirect
            if (response.data.role === "student") {
                navigate("/student-dashboard");
            } else if (response.data.role === "admin") {
                navigate("/admin-dashboard");
            } else if (response.data.role === "staff") {
                navigate("/staff-dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);

            showToast(
                error.response?.data?.message || "Login failed!",
                TOAST_TYPE.ERROR
            );
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            {
                loading ? <Spinner /> :
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
                                value={formData.email.toLowerCase().trim()}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col relative">
                            <label className="block mb-1 text-gray-600 font-medium">
                                Password
                            </label>
                            {
                                showPassword ? <div>
                                    <Eye onClick={() => { setShowPassword(false) }} className="absolute right-2 top-9 hover:cursor-pointer w-5" />
                                    <input
                                        type="text"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div> :
                                    <div>
                                        <EyeOff onClick={() => { setShowPassword(true) }} className="absolute right-2 top-9 hover:cursor-pointer w-5" />
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter password"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />


                                    </div>
                            }
                            <div onClick={updatePasswordHandler} className="text-blue-700 hover:cursor-pointer text-sm self-end">forgot password ? </div>
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
            }
        </div>
    );
};

export default LoginForm;
