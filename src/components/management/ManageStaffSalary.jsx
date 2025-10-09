import React from "react";
import { FileSpreadsheet } from "lucide-react";

const ManageStaffSalary = ({ role }) => {
    const isAdmin = localStorage.getItem("role") === "admin";

    return (
        <div className="bg-white p-5 rounded-2xl shadow-md">
            <div className="flex items-center mb-3">
                <FileSpreadsheet className="text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold">Staff Salary</h2>
            </div>

            <p className="text-gray-600 mb-3">
                {isAdmin
                    ? "Manage staff salary details, add staff, and generate salary slips."
                    : "View your salary details and payslips."}
            </p>

            <div className="flex gap-3 flex-wrap">

                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    Add Staff
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                    Update Staff Info
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    Generate Salary Slip
                </button>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    View Salary
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                    View Salary Slip
                </button>
            </div>
        </div>
    );
}
export default ManageStaffSalary;