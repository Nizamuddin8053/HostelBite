

import React from "react";
import Sidebar from "../common/Sidebar";
import ManageFeedbackAttendance  from "../management/ManageFeedbackAttendance";
import ManageMenuExpenses from "../management/ManageMenuExpenses";
import ManagePaymentInvoice from "../management/ManagePaymentInvoice";
import ManageStaffSalary from "../management/ManageStaffSalary";
import ManageComplaintNotification from "../management/MangeComplaintNotification";
import UserManagement from "../management/UserManagement";


const AdminDashboard =()=> {
    return (
        <div className="flex min-h-screen flex-wrap bg-gray-100">
            <div className="flex-1 flex flex-col">
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <ManageFeedbackAttendance />
                    <ManageMenuExpenses />
                    <ManagePaymentInvoice />
                    <ManageStaffSalary />
                    <ManageComplaintNotification />
                    <UserManagement />
                </div>
            </div>

        

        </div>
    );
}

export default AdminDashboard;