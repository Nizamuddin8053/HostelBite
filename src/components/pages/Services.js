import React from "react";
import {
    Utensils,
    CreditCard,
    Bell,
    ClipboardList,
    MessageSquare,
    Users,
    BarChart3,
    FileText,
} from "lucide-react";

export default function Services() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
            
            {/* 🏠 Hero Section */}
            <section className="text-center py-20 px-6 bg-gradient-to-b from-indigo-50 to-white">
                <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-6">
                    Our Services at HostelBite 🍴
                </h2>
                <p className="max-w-3xl mx-auto text-gray-600 text-lg">
                    We provide a complete digital mess management solution designed for hostel
                    administrators, staff, and students — making daily dining efficient,
                    transparent, and connected.
                </p>
            </section>

            {/* 💡 Services Grid */}
            <section className="py-16 px-8 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Menu Management */}
                    <div className="bg-indigo-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <div className="flex justify-center mb-4">
                            <ClipboardList className="text-indigo-600" size={40} />
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-2">
                            Menu & Meal Management
                        </h3>
                        <p className="text-gray-600 text-sm text-center">
                            Students and staff can view daily, weekly, and monthly menus online.
                            Admins can update menus instantly.
                        </p>
                    </div>

                    {/* Online Payment System */}
                    <div className="bg-indigo-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <div className="flex justify-center mb-4">
                            <CreditCard className="text-indigo-600" size={40} />
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-2">
                            Online Payment System
                        </h3>
                        <p className="text-gray-600 text-sm text-center">
                            Secure and fast online payment integration for mess fees using UPI or cards.
                        </p>
                    </div>

                    {/* Notifications */}
                    <div className="bg-indigo-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <div className="flex justify-center mb-4">
                            <Bell className="text-indigo-600" size={40} />
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-2">
                            Notifications & Announcements
                        </h3>
                        <p className="text-gray-600 text-sm text-center">
                            Students and staff receive instant updates about menu changes, payments,
                            or special events.
                        </p>
                    </div>

                    {/* Attendance Tracking */}
                    <div className="bg-indigo-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <div className="flex justify-center mb-4">
                            <BarChart3 className="text-indigo-600" size={40} />
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-2">
                            Attendance Tracking
                        </h3>
                        <p className="text-gray-600 text-sm text-center">
                            Automatically manage meal attendance records for students and staff to
                            ensure accurate meal counts.
                        </p>
                    </div>

                    {/* Feedback System */}
                    <div className="bg-indigo-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <div className="flex justify-center mb-4">
                            <MessageSquare className="text-indigo-600" size={40} />
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-2">
                            Feedback & Complaints
                        </h3>
                        <p className="text-gray-600 text-sm text-center">
                            Students can easily submit feedback or complaints directly through the
                            dashboard for better quality control.
                        </p>
                    </div>

                    {/* Staff & Expense Management */}
                    <div className="bg-indigo-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <div className="flex justify-center mb-4">
                            <Users className="text-indigo-600" size={40} />
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-2">
                            Staff & Expense Management
                        </h3>
                        <p className="text-gray-600 text-sm text-center">
                            Admins can manage staff salaries, expenses, and records seamlessly.
                        </p>
                    </div>

                    {/* Invoice Generation */}
                    <div className="bg-indigo-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <div className="flex justify-center mb-4">
                            <FileText className="text-indigo-600" size={40} />
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-2">
                            Invoice & Reports
                        </h3>
                        <p className="text-gray-600 text-sm text-center">
                            Auto-generate invoices and monthly reports for students and staff to track
                            financial summaries.
                        </p>
                    </div>

                    {/* Analytics Dashboard */}
                    <div className="bg-indigo-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <div className="flex justify-center mb-4">
                            <BarChart3 className="text-indigo-600" size={40} />
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-2">
                            Analytics Dashboard
                        </h3>
                        <p className="text-gray-600 text-sm text-center">
                            Admins can view insights like food usage trends, attendance patterns, and
                            cost efficiency reports.
                        </p>
                    </div>
                </div>
            </section>

            {/* 🍴 CTA Section */}
            <section className="py-20 bg-indigo-600 text-white text-center">
                <h3 className="text-3xl font-semibold mb-4">
                    Streamline Your Hostel’s Mess Management Today!
                </h3>
                <p className="max-w-2xl mx-auto mb-8 text-indigo-100">
                    Join hundreds of hostels using HostelBite to simplify food management and
                    improve student satisfaction.
                </p>
                <a
                    href="/register"
                    className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-100 transition"
                >
                    Get Started Now
                </a>
            </section>

            {/* ⚓ Footer */}
            <footer className="bg-indigo-700 text-white text-center py-4 mt-10">
                <p className="text-sm">
                    © {new Date().getFullYear()} HostelBite | Made with ❤️ for hostel life
                </p>
            </footer>
        </div>
    );
}
