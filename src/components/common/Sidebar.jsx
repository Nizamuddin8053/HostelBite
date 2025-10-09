import React from "react";
import {
    Bell,
    FileText,
    CreditCard,
    Book,
    Utensils,
    FileSpreadsheet,
    Users,
} from "lucide-react";

const Sidebar =({ role })=> {
    const commonLinks = [{ label: "Notifications", icon: Bell }];

    const studentLinks = [
        { label: "Complaints", icon: FileText },
        { label: "Feedback & Attendance", icon: Book },
        { label: "Menu", icon: Utensils },
        { label: "Payments", icon: CreditCard },
    ];

    const staffLinks = [
        { label: "Salary", icon: FileSpreadsheet },
        { label: "Feedback & Attendance", icon: Book },
        { label: "Complaints & Notifications", icon: FileText },
        { label: "Menu", icon: Utensils },
    ];

    const adminLinks = [
        { label: "Feedback & Attendance", icon: Book },
        { label: "Menu & Expenses", icon: Utensils },
        { label: "Payments & Invoices", icon: CreditCard },
        { label: "Staff Salary", icon: FileSpreadsheet },
        { label: "Manage Complaints & Notifications", icon: FileText },
        { label: "User Management", icon: Users },
    ];

    let links = [];

    if (role === "student") links = [...studentLinks, ...commonLinks];
    else if (role === "staff") links = [...staffLinks];
    else if (role === "admin") links = [...adminLinks];

    return (
        <div className="w-64 bg-white shadow-lg flex flex-col p-4">
            <h2 className="text-xl font-bold mb-6 text-center text-indigo-600 capitalize">
                {role} Panel
            </h2>
            <nav className="space-y-3">
                {links.map((link, i) => (
                    <a
                        key={i}
                        className="flex items-center p-2 hover:bg-indigo-50 rounded cursor-pointer"
                    >
                        <link.icon className="mr-2 text-indigo-600" />
                        {link.label}
                    </a>
                ))}
            </nav>
        </div>
    );
}
export default Sidebar;