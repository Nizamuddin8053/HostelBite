import React from "react";
import { Utensils, Users, Heart, Lightbulb, Star, Mail } from "lucide-react";
import nizam from '../../assets/nizam.jpg';

const About =()=> {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
            

            {/* 🧠 About Section */}
            <section className="text-center py-20 px-6 bg-gradient-to-b from-indigo-50 to-white">
                <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-6">
                    About HostelBite 🍴
                </h2>
                <p className="max-w-3xl mx-auto text-gray-600 text-lg">
                    HostelBite is a smart mess management platform designed for hostels and institutions.
                    It simplifies daily meal tracking, feedback collection, attendance management, and payments —
                    making hostel dining more transparent and efficient.
                </p>
            </section>

            {/* 🌍 Mission, Vision, Values */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Mission */}
                    <div className="bg-indigo-50 p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
                        <Lightbulb className="text-indigo-600 mx-auto mb-4" size={36} />
                        <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                        <p className="text-gray-600 text-sm">
                            To revolutionize hostel dining by using digital tools that bring efficiency,
                            transparency, and convenience for both students and staff.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="bg-indigo-50 p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
                        <Star className="text-indigo-600 mx-auto mb-4" size={36} />
                        <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                        <p className="text-gray-600 text-sm">
                            To become the leading digital solution for mess and food management
                            in hostels across India and beyond.
                        </p>
                    </div>

                    {/* Values */}
                    <div className="bg-indigo-50 p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
                        <Heart className="text-indigo-600 mx-auto mb-4" size={36} />
                        <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                        <p className="text-gray-600 text-sm">
                            Quality, accountability, sustainability, and respect for food.
                            We believe that a good meal builds a good community.
                        </p>
                    </div>
                </div>
            </section>

            {/* 🍽️ Features Section */}
            <section className="py-20 bg-indigo-50 px-8">
                <h3 className="text-3xl font-semibold text-center text-indigo-700 mb-12">
                    What Makes HostelBite Special
                </h3>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition">
                        <img
                            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=800&q=60"
                            alt="Food menu"
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h4 className="text-lg font-semibold text-indigo-700 mb-2">Digital Menu</h4>
                        <p className="text-gray-600 text-sm">
                            Check daily veg and non-veg dishes online anytime, anywhere.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition">
                        <img
                            src="https://th.bing.com/th/id/OIP.g_jsgQsCS1aK7qe7z_7g0AHaE8?w=208&h=180&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3"
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h4 className="text-lg font-semibold text-indigo-700 mb-2">Online Payments</h4>
                        <p className="text-gray-600 text-sm">
                            Pay your mess bills instantly and securely using UPI or cards.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition">
                        <img
                            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=60"
                            alt="Feedback"
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h4 className="text-lg font-semibold text-indigo-700 mb-2">Feedback System</h4>
                        <p className="text-gray-600 text-sm">
                            Share your dining feedback easily to help improve food quality.
                        </p>
                    </div>
                </div>
            </section>

            {/* 👨‍🍳 Team / Contact Section */}
            <section className="py-16 px-8 bg-white">
                <h3 className="text-3xl font-semibold text-center text-indigo-700 mb-12">
                    Meet the HostelBite Team
                </h3>

                <div className="flex flex-col md:flex-row justify-center items-center gap-5 max-w-7xl mx-auto">
                    {/* Nizamuddin */}
                    <div className="text-center">
                        <img
                            src={nizam}
                            alt="Team member"
                            className="w-40 h-40 object-cover rounded-full mx-auto mb-4 shadow-lg"
                        />
                        <h4 className="font-semibold text-lg text-gray-800">Nizamuddin</h4>
                        <p className="text-sm text-gray-600">Project Lead & Full-Stack Developer</p>
                    </div>

                    {/* Abhijeet Soni */}

                    <div className="text-center">
                        <img
                            src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=800&q=60"
                            alt="Team member"
                            className="w-40 h-40 object-cover rounded-full mx-auto mb-4 shadow-lg"
                        />
                        <h4 className="font-semibold text-lg text-gray-800">Abhijeet Soni</h4>
                        <p className="text-sm text-gray-600">UI/UX Designer & Frontend Developer</p>
                    </div>

                    {/* Amarjeet Kumar */}

                    <div className="text-center">
                        <img
                            src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=800&q=60"
                            alt="Team member"
                            className="w-40 h-40 object-cover rounded-full mx-auto mb-4 shadow-lg"
                        />
                        <h4 className="font-semibold text-lg text-gray-800">Amarjeet Kumar</h4>
                        <p className="text-sm text-gray-600">UI/UX Designer & Frontend Developer</p>
                    </div>

                    {/* Meer Samad Khan */}

                    <div className="text-center">
                        <img
                            src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=800&q=60"
                            alt="Team member"
                            className="w-40 h-40 object-cover rounded-full mx-auto mb-4 shadow-lg"
                        />
                        <h4 className="font-semibold text-lg text-gray-800">Meer Samad Khan</h4>
                        <p className="text-sm text-gray-600">Database Designer</p>
                    </div>

                    {/* Pooja Prusty */}

                    <div className="text-center">
                        <img
                            src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=800&q=60"
                            alt="Team member"
                            className="w-40 h-40 object-cover rounded-full mx-auto mb-4 shadow-lg"
                        />
                        <h4 className="font-semibold text-lg text-gray-800">Pooja Prusty</h4>
                        <p className="text-sm text-gray-600">UI/UX Designer & Frontend Developer</p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-3">
                        Want to collaborate or learn more about HostelBite?
                    </p>
                    <a
                        href="mailto:hostelbite.team@gmail.com"
                        className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800"
                    >
                        <Mail className="mr-2" size={20} /> hostelbite.team@gmail.com
                    </a>
                </div>
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
export default About;