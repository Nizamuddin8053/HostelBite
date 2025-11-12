import React from "react";
import { Link } from "react-router-dom";
import {
    Bell,
    FileText,
    CreditCard,
    Book,
    Utensils,
    FileSpreadsheet,
    Users,
} from "lucide-react";

const Sidebar = ({ role }) => {
   
    const studentLinks = [
        { label: "Complaints", icon: FileText, path: "/student-dashboard/complaint-section" },
        { label: "Feedback & Attendance", icon: Book, path: "/student-dashboard/feedback-section" },
        { label: "Menu", icon: Utensils, path: "/student-dashboard/menu-section" },
        { label: "Payments", icon: CreditCard, path: "/student-dashboard/payment-section" },
        { label: "Notifications", icon: Bell, path: "/student-dashboard/notification-section" },
    ];

    const staffLinks = [
        { label: "Salary", icon: FileSpreadsheet, path: "/staff-dashboard/salary-section" },
        { label: "Feedback & Attendance", icon: Book, path: "/staff-dashboard/feedback-section" },
        { label: "Complaints & Notifications", icon: FileText, path: "/staff-dashboard/complaints-section" },
        { label: "Menu", icon: Utensils, path: "/staff-dashboard/menu-section" },
    ];

    const adminLinks = [
        { label: "Feedback & Attendance", icon: Book, path: "/admin-dashboard/feedback-section" },
        { label: "Menu & Expenses", icon: Utensils, path: "/admin-dashboard/menu-section" },
        { label: "Payments & Invoices", icon: CreditCard, path: "/admin-dashboard/payments-section" },
        { label: "Staff Salary", icon: FileSpreadsheet, path: "/admin-dashboard/salary-section" },
        { label: "Manage Complaints & Notifications", icon: FileText, path: "/admin-dashboard/complaints-section" },
        { label: "User Management", icon: Users, path: "/admin-dashboard/users-section" },
    ];

    let links = [];
    if (role === "student") links = [...studentLinks];
    else if (role === "staff") links = [...staffLinks];
    else if (role === "admin") links = [...adminLinks];

    return (
        <div className="w-64 bg-white shadow-lg flex flex-col p-4">
            <h2 className="text-xl font-bold mb-6 text-center text-indigo-600 capitalize">
                {role} Panel
            </h2>
            <nav className="space-y-3">
                {links.map((link, i) => (
                    <Link
                        key={i}
                        to={link.path}
                        className="flex items-center p-2 hover:bg-indigo-50 rounded cursor-pointer"
                    >
                        <link.icon className="mr-2 text-indigo-600" />
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
