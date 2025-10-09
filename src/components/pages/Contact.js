import React from "react";
import { Utensils, Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
    
            {/* 💬 Hero Section */}
            <section className="text-center py-20 px-6 bg-gradient-to-b from-indigo-50 to-white">
                <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-6">
                    Get in Touch With Us 📞
                </h2>
                <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                    Have questions, feedback, or suggestions?
                    We’d love to hear from you. The HostelBite team is always ready to help!
                </p>
            </section>

            {/* 📩 Contact Form & Info */}
            <section className="py-16 px-8 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Contact Form */}
                    <div className="bg-indigo-50 p-8 rounded-2xl shadow-md">
                        <h3 className="text-2xl font-semibold text-indigo-700 mb-6">
                            Send Us a Message
                        </h3>

                        <form className="flex flex-col space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    placeholder="Write your message here..."
                                    rows="5"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 flex items-center justify-center space-x-2"
                            >
                                <Send size={18} />
                                <span>Send Message</span>
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="flex flex-col justify-center p-8">
                        <h3 className="text-2xl font-semibold text-indigo-700 mb-6">
                            Contact Information
                        </h3>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <Mail className="text-indigo-600 mt-1" size={24} />
                                <div>
                                    <h4 className="font-semibold text-gray-800">Email</h4>
                                    <p className="text-gray-600">hostelbite.team@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Phone className="text-indigo-600 mt-1" size={24} />
                                <div>
                                    <h4 className="font-semibold text-gray-800">Phone</h4>
                                    <p className="text-gray-600">+91 98765 43210</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <MapPin className="text-indigo-600 mt-1" size={24} />
                                <div>
                                    <h4 className="font-semibold text-gray-800">Address</h4>
                                    <p className="text-gray-600">
                                        HostelBite HQ, Tech Park Avenue,
                                        Pune, Maharashtra, India - 411001
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <img
                                src="https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=60"
                                alt="Office Map"
                                className="rounded-2xl shadow-md object-cover w-full h-64"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 🌟 CTA Section */}
            <section className="py-16 bg-indigo-600 text-white text-center">
                <h3 className="text-3xl font-semibold mb-4">We’d love to hear from you!</h3>
                <p className="max-w-2xl mx-auto mb-6 text-indigo-100">
                    Whether you have a suggestion, feedback, or partnership idea —
                    reach out to us and help make hostel dining smarter.
                </p>
                <a
                    href="mailto:hostelbite.team@gmail.com"
                    className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-100 transition"
                >
                    Email Us
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
