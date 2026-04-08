import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner"
import { FaRegCheckCircle } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import showToast from "../../utils/showToast";
import { TOAST_TYPE } from "../../utils/constants";

const SignupForm = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        otp: "",
        password: "",
        confirmPassword: "",
        role: "",
        roomNumber: "",
        staffRole: "",
        course: "",
        year: "",
    });

    // console.log("API URL:", process.env.REACT_APP_API_URL);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    //  Email validation regex
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const { email, otp } = formData;
    const handleSendOtp = async () => {
        setLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/send-otp`, {
                email,
            });

            setOtpSent(true);
            setLoading(false);

            showToast("otp sent to your email",TOAST_TYPE.SUCCESS);

        } catch (err) {
            // console.log(err);
            if (err.response) {

                showToast(err.response.data.message, TOAST_TYPE.ERROR);

            } else {

                showToast("something went wrong", TOAST_TYPE.ERROR);
                

            }
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        try {

            if (!otp) {

                showToast("Please enter your otp", TOAST_TYPE.ERROR)

                return;
            }
            setLoading(true);
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/verify-otp`, {
                email,
                otp,
            });
            setLoading(false);
            setVerified(true);
        } catch (err) {
            console.log(err);
        }
    };


    //  Password strength checker
    const isStrongPassword = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const { name, email, password, confirmPassword, role } = formData;

        // --- Basic validations ---
        if (!name || !email || !password || !confirmPassword || !role) {

            showToast("Please fill all the require fields", TOAST_TYPE.ERROR);
            
            setLoading(false);
            return;
        }

        if (!isValidEmail(email)) {
            showToast("Enter a valid email address", TOAST_TYPE.ERROR);
            setLoading(false);
            return;
        }

        if (!isStrongPassword(password)) {
            showToast("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.", TOAST_TYPE.ERROR);
    
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {

            showToast("Passwords did not match", TOAST_TYPE.ERROR);

            setLoading(false);
            return;
        }

        if(verified === false){

            showToast("verify your email, click on send to verify your email", TOAST_TYPE.ERROR);

            setLoading(false);
            return;

        }


        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/signup`,
                formData
            );

            showToast("signup successfull", TOAST_TYPE.SUCCESS);

            navigate("/login");



        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Signup failed!");
        } finally {
            setLoading(false);

        }


    };

    const { role } = formData;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            {
                loading ? <Spinner /> :
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

                        <div className="flex flex-col">
                            <label className="block mb-1 text-gray-600 font-medium">Email</label>
                            <div className="flex flex-row gap-3">
                                <input
                                    type="email"
                                    required
                                    name="email"
                                    value={formData.email.toLowerCase().trim()}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />

                                {!otpSent && !loading && (
                                    <span 
                                       className="ml-[10px] text-blue-600 cursor-pointer"
                                        onClick={handleSendOtp}
                                    >
                                        Send
                                    </span>
                                )}

                                {
                                    otpSent && loading && <span className="ml-[10px]"><Spinner/></span>
                                }

                                {otpSent && !verified && (
                                    <span
                                        className="ml-[10px] text-green-400 cursor-pointer"
                                        onClick={handleVerifyOtp}
                                    >
                                        Verify
                                    </span>
                                )}

                                {
                                    loading ? <Spinner /> :
                                        <div className="flex flex-col justify-center">
                                            {verified && <span style={{ marginLeft: "10px", font: "0.5rem" }}>
                                                <FaRegCheckCircle className=" text-green-400 w-6 h-6" /> </span>}
                                        </div>
                                }
                            </div>


                        </div>

                        {/* OTP Input */}
                        {otpSent && !verified && (
                            <input
                                type="text"
                                name="otp"
                                value={formData.otp}
                                onChange={handleChange}
                                placeholder="Enter otp"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        )}



                        {/* Password */}
                        <div className="relative ">
                            <label className="block mb-1 text-gray-600 font-medium">
                                Password
                            </label>

                            {
                                showPassword ?
                                <div>
                                    <Eye onClick={() => { setShowPassword(false) }} className="absolute right-2 top-9 hover:cursor-pointer w-5" />
                                    <input
                                        type="text"
                                        required
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />

                                </div> :
                                 <div>
                                    <EyeOff onClick={() => { setShowPassword(true) }} className="absolute right-2 top-9 hover:cursor-pointer w-5 text-violet-900" />
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

                            }

                            <p className="text-xs text-gray-500 mt-1">
                                Must contain 8+ chars, uppercase, lowercase, number & symbol.
                            </p>



                        </div>

                        {/* Confirm Password */}
                        <div className="relative ">
                            <label className="block mb-1 text-gray-600 font-medium">
                                Confirm Password
                            </label>

                            {
                                showConfirmPassword ?
                                <div>
                                    <Eye onClick={() => { setShowConfirmPassword(false) }} className="absolute right-2 top-9 hover:cursor-pointer w-5" />
                                    <input
                                        type="text"
                                        required
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="confirm password"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />

                                </div> :
                                 <div>
                                    <EyeOff onClick={() => { setShowConfirmPassword(true) }} className="absolute right-2 top-9 hover:cursor-pointer w-5 text-violet-900" />
                                    <input
                                        type="password"
                                        required
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="confirm password"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />


                                </div>

                            }

                            <p className="text-xs text-gray-500 mt-1">
                                Must contain 8+ chars, uppercase, lowercase, number & symbol.
                            </p>



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
                                        name="roomNumber"
                                        value={formData.roomNumber}
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
                            signup

                        </button>


                    </form>
            }
        </div>
    );
};

export default SignupForm;
