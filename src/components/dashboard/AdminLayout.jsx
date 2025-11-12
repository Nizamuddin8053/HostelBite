import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";

const StudentLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar role="admin" />
            <div className="flex-1 p-6">
                <Outlet /> {/* Here the right-side page will render */}
            </div>
        </div>
    );
};

export default StudentLayout;
