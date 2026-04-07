import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { ACCOUNT_TYPE } from "../../utils/constants";

const StaffLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/*  Sidebar (Desktop) */}
            <div className="hidden md:block">
                <Sidebar role={ACCOUNT_TYPE.STAFF} />
            </div>

            {/*  Mobile Sidebar (Overlay) */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex">
                    
                    {/* Sidebar */}
                    <div className="w-64 bg-white shadow-lg">
                        <Sidebar role={ACCOUNT_TYPE.STAFF} />
                    </div>

                    {/* Overlay background */}
                    <div
                        className="flex-1 bg-black bg-opacity-40"
                        onClick={() => setIsOpen(false)}
                    ></div>
                </div>
            )}

            {/* main Content */}
            <div className="flex-1 w-full">

                {/* Top Bar (Mobile Only) */}
                <div className="md:hidden flex items-center justify-between bg-white p-4 shadow">
                    <h2 className="font-bold text-lg">Dashboard</h2>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="text-2xl"
                    >
                        <FaBars />
                    </button>
                </div>

                {/* Close button inside sidebar (mobile) */}
                {isOpen && (
                    <button
                        onClick={() => setIsOpen(false)}
                        className="fixed top-4 left-64 z-50 text-white text-2xl"
                    >
                        <FaTimes />
                    </button>
                )}

                {/* Page Content */}
                <div className="p-4 md:p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default StaffLayout;