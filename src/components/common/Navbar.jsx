import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const token = localStorage.getItem("token");
    let fullName = "";
    let role = "";

    if (token) {
        try {
            const decoded = jwtDecode(token);
            role = decoded.role;
            fullName = decoded.fullName;
        } catch {}
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="flex justify-between items-center">

                {/* Logo */}
                <div className="flex items-center gap-3 cursor-pointer">
                    <img
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_1vHDp8IZAcao_xFbz7s-wxUQmDW6Lu7XIA&s"
                        alt="logo"
                    />
                    <div className="text-xl font-extrabold tracking-wider">
                        HostelBite
                    </div>
                </div>

                {/* Desktop Links */}
                {!token && (
                    <div className="hidden md:flex gap-6 font-medium">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/services">Services</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                )}

                {/* Desktop Right Side */}
                <div className="hidden md:flex items-center gap-4">
                    {!token ? (
                        <>
                            <Link to="/signup">Signup</Link>
                            <Link to="/login">Login</Link>
                        </>
                    ) : (
                        <>
                            <span>
                                Welcome, {fullName?.split(" ")[0]}
                            </span>

                            <button
                                onClick={() => {
                                    if (role === "student") navigate("/student-dashboard");
                                    else if (role === "admin") navigate("/admin-dashboard");
                                    else if (role === "staff") navigate("/staff-dashboard");
                                    else navigate("/login");
                                }}
                                className="bg-white text-blue-600 px-3 py-1 rounded-md"
                            >
                                Dashboard
                            </button>

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-3 py-1 rounded-md"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden text-2xl cursor-pointer">
                    {isOpen ? (
                        <FaTimes onClick={() => setIsOpen(false)} />
                    ) : (
                        <FaBars onClick={() => setIsOpen(true)} />
                    )}
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-4 bg-blue-500 p-4 rounded-lg">

                    {!token && (
                        <>
                            <Link onClick={() => setIsOpen(false)} to="/">Home</Link>
                            <Link onClick={() => setIsOpen(false)} to="/about">About</Link>
                            <Link onClick={() => setIsOpen(false)} to="/services">Services</Link>
                            <Link onClick={() => setIsOpen(false)} to="/contact">Contact</Link>
                            <Link onClick={() => setIsOpen(false)} to="/signup">Signup</Link>
                            <Link onClick={() => setIsOpen(false)} to="/login">Login</Link>
                        </>
                    )}

                    {token && (
                        <>
                            <span>
                                Welcome, {fullName?.split(" ")[0]}
                            </span>


                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    handleLogout();
                                }}
                                className="bg-red-500 px-3 py-1 rounded-md"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;