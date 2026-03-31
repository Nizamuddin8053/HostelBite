import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";

const StudentLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar role="student" />
            <div className="flex-1 p-6">
                {/* right side of page */}
                <Outlet /> 
            </div>
        </div>
    );
};

export default StudentLayout;
