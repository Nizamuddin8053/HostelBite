import React from "react";
import Sidebar from "../common/Sidebar";
import SalarySection from "../staff/SalarySection";
import NotificationSection from "../staff/ComplaintNotification";
import MenuSection from "../common/Menu";
import FeedbackSection from "../staff/FeedbackAttendance";

const StaffDashboard =()=> {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar role="staff" />
            <div className="flex-1 flex flex-col">

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <SalarySection />
                    <MenuSection />
                    <FeedbackSection />
                    <NotificationSection />
                </div>
            </div>

           
        </div>
    );
}

export default StaffDashboard;  
