import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const SidebarDashboard = ({ role }) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left Sidebar */}
            <Sidebar role={role} />

            {/* Right Page Area */}
            <div className="flex-1 p-6">
                <Outlet /> {/* Renders selected page here */}
            </div>
        </div>
    );
};

export default SidebarDashboard;
