import React from "react";
import { Utensils, Leaf, Drumstick, CreditCard, Bell, ClipboardList } from "lucide-react";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
           
            {/* 🏠 Hero Section */}
            <section className="flex flex-col items-center text-center py-20 px-6 bg-gradient-to-b from-indigo-50 to-white">
                <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
                    Smart Mess Management for Hostels 🍽️
                </h2>
                <p className="text-gray-600 max-w-2xl mb-6">
                    HostelBite helps you manage daily meals, expenses, attendance, and payments —
                    all in one platform. Fresh, fast, and efficient.
                </p>
                <div className="flex space-x-4">
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700">
                        Explore Menu
                    </button>
                    <button className="border border-indigo-600 text-indigo-700 px-6 py-3 rounded-xl hover:bg-indigo-50">
                        Learn More
                    </button>
                </div>
            </section>

            {/* 🥗 Veg & 🍗 Non-Veg Section */}
            <section className="py-16 px-8 bg-white">
                <h3 className="text-3xl font-semibold text-center text-indigo-700 mb-10">
                    Our Delicious Meals
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {/* Veg Section */}
                    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <img
                            src="https://images.pexels.com/photos/10345736/pexels-photo-10345736.jpeg"
                            alt="Veg Meal"
                            className="w-full h-60 object-cover"
                        />
                        <div className="p-5">
                            <div className="flex items-center mb-2">
                                <Leaf className="text-green-600 mr-2" />
                                <h4 className="text-xl font-semibold text-gray-800">Veg Menu</h4>
                            </div>
                            <p className="text-gray-600">
                                Healthy and nutritious vegetarian dishes — perfect balance of taste and health.
                            </p>
                        </div>
                    </div>

                    {/* Non-Veg Section */}
                    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <img
                            src="https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg"
                            alt="Non-Veg Meal"
                            className="w-full h-60 object-cover"
                        />
                        <div className="p-5">
                            <div className="flex items-center mb-2">
                                <Drumstick className="text-red-600 mr-2" />
                                <h4 className="text-xl font-semibold text-gray-800">Non-Veg Menu</h4>
                            </div>
                            <p className="text-gray-600">
                                Tasty and protein-rich non-veg meals for our food lovers — cooked fresh every day.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 💡 Why Choose HostelBite */}
            <section className="py-16 px-6 bg-indigo-50">
                <h3 className="text-3xl font-semibold text-center text-indigo-700 mb-10">
                    Why Choose HostelBite?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                        <CreditCard className="text-indigo-600 mx-auto mb-3" size={32} />
                        <h4 className="font-semibold text-lg mb-2">Easy Payments</h4>
                        <p className="text-gray-600 text-sm">
                            Pay your mess bills online through secure payment gateways.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                        <ClipboardList className="text-indigo-600 mx-auto mb-3" size={32} />
                        <h4 className="font-semibold text-lg mb-2">Menu Management</h4>
                        <p className="text-gray-600 text-sm">
                            Access your daily, weekly, or monthly menu anytime.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                        <Bell className="text-indigo-600 mx-auto mb-3" size={32} />
                        <h4 className="font-semibold text-lg mb-2">Smart Notifications</h4>
                        <p className="text-gray-600 text-sm">
                            Stay updated about meal changes, payments, and announcements.
                        </p>
                    </div>
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
export default Home;