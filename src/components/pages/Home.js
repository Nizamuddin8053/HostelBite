
import {
    CreditCard,
    Bell,
    ClipboardList,
    Users,
    MessageSquare,
    AlertCircle,
    Leaf,
    Drumstick
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import { useState, useEffect } from "react";

const images = [
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg",
    ];


const Home = () => {


    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);



    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const LearnMoreHandler = () => {
        navigate("/about");
    }
    const GetStartedHandler = () => {
        navigate("/signup");
    }


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 4000); // change every 4 sec

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">



            {/* text about hostelbite */}


            <section className="py-20 px-6 bg-gradient-to-b from-indigo-50 to-white">
                <div
                    data-aos="fade-up"
                    className="max-w-5xl mx-auto text-center"
                >
                    {/* Small Tag */}
                    <span className="inline-block bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
                        🚀 Smart Hostel Solution
                    </span>

                    {/* Main Heading */}
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        Simplify Your Hostel Life with{" "}
                        <span className="text-indigo-600">HostelBite</span>
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-6">
                        Manage your mess, meals, and expenses without the chaos.
                        HostelBite brings everything into one smart platform — making
                        food management faster, transparent, and stress-free.
                    </p>

                    {/* Highlight Line */}
                    <p className="text-gray-500 text-md italic">
                        Built for students. Designed for simplicity. Powered for efficiency.
                    </p>

                    {/* Buttons */}
                    <div onClick={GetStartedHandler} className="mt-8 flex justify-center gap-4 flex-wrap">
                        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition">
                            Get Started
                        </button>

                        <button onClick={LearnMoreHandler} className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-50 transition">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/*  Hero Section */}

            <section className="py-10 px-6 bg-gradient-to-b from-indigo-50 to-white">
                <div className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden">

                    {/* Image */}
                    <img
                        src={images[current]}
                        alt="slider"
                        className="w-full h-[400px] object-cover transition-all duration-700"
                    />

                    {/* Overlay Text (optional - looks premium) */}
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">
                            Delicious Meals Everyday 🍽️
                        </h2>
                        <p className="text-lg">Fresh • Hygienic • Affordable</p>
                    </div>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`w-3 h-3 rounded-full ${current === index ? "bg-white" : "bg-gray-400"
                                    }`}
                            ></div>
                        ))}
                    </div>


                    <button
                        onClick={() => setCurrent((current - 1 + images.length) % images.length)}
                        className="absolute left-4 top-1/2 text-white text-2xl"
                    >
                        ⏮
                    </button>

                    <button
                        onClick={() => setCurrent((current + 1) % images.length)}
                        className="absolute right-4 top-1/2 text-white text-2xl"
                    >
                        ⏭
                        
                    </button>

                </div>
            </section>

            {/* repeated section */}

            <section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

                    <div data-aos="fade-up" className="p-6 rounded-xl shadow-md">
                        <h2 className="text-3xl font-bold text-indigo-600">500+</h2>
                        <p className="text-gray-600">Students Served</p>
                    </div>

                    <div data-aos="fade-up" className="p-6 rounded-xl shadow-md">
                        <h2 className="text-3xl font-bold text-indigo-600">30+</h2>
                        <p className="text-gray-600">Meals Weekly</p>
                    </div>

                    <div data-aos="fade-up" className="p-6 rounded-xl shadow-md">
                        <h2 className="text-3xl font-bold text-indigo-600">99%</h2>
                        <p className="text-gray-600">Satisfaction</p>
                    </div>

                </div>
            </section>



            {/*  Veg &  Non-Veg Section */}
            <section className="py-16 px-8 bg-white">
                <h3 className="text-3xl font-semibold text-center text-indigo-700 mb-10">
                    Our Delicious Meals
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {/* Veg Section */}
                    <div data-aos="fade-right" className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
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
                    <div data-aos="fade-left" className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
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

            {/* repeated section */}

            <section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

                    <div data-aos="fade-up" className="p-6 rounded-xl shadow-md">
                        <h2 className="text-3xl font-bold text-indigo-600">500+</h2>
                        <p className="text-gray-600">Students Served</p>
                    </div>

                    <div data-aos="fade-up" className="p-6 rounded-xl shadow-md">
                        <h2 className="text-3xl font-bold text-indigo-600">30+</h2>
                        <p className="text-gray-600">Meals Weekly</p>
                    </div>

                    <div data-aos="fade-up" className="p-6 rounded-xl shadow-md">
                        <h2 className="text-3xl font-bold text-indigo-600">99%</h2>
                        <p className="text-gray-600">Satisfaction</p>
                    </div>

                </div>
            </section>

            {/*  Why Choose HostelBite */}
            <section className="py-16 px-6 bg-indigo-50">
                <h3 className="text-3xl font-semibold text-center text-indigo-700 mb-10">
                    Why Choose HostelBite?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {/* Easy Payments */}
                    <div data-aos="zoom-in" className="bg-white p-6 rounded-2xl shadow-md text-center hover:scale-105 transition">
                        <CreditCard className="text-indigo-600 mx-auto mb-3" size={32} />
                        <h4 className="font-semibold text-lg mb-2">Easy Payments</h4>
                        <p className="text-gray-600 text-sm">
                            Pay your mess bills online through secure payment gateways.
                        </p>
                    </div>

                    {/* Menu Management */}
                    <div data-aos="zoom-in" className="bg-white p-6 rounded-2xl shadow-md text-center hover:scale-105 transition">
                        <ClipboardList className="text-indigo-600 mx-auto mb-3" size={32} />
                        <h4 className="font-semibold text-lg mb-2">Menu Management</h4>
                        <p className="text-gray-600 text-sm">
                            Access your daily, weekly, or monthly menu anytime.
                        </p>
                    </div>

                    {/* Notifications */}
                    <div data-aos="zoom-in" className="bg-white p-6 rounded-2xl shadow-md text-center hover:scale-105 transition">
                        <Bell className="text-indigo-600 mx-auto mb-3" size={32} />
                        <h4 className="font-semibold text-lg mb-2">Smart Notifications</h4>
                        <p className="text-gray-600 text-sm">
                            Stay updated about meal changes, payments, and announcements.
                        </p>
                    </div>

                    {/* Attendance */}
                    <div data-aos="zoom-in" className="bg-white p-6 rounded-2xl shadow-md text-center hover:scale-105 transition">
                        <ClipboardList className="text-indigo-600 mx-auto mb-3" size={32} />
                        <h4 className="font-semibold text-lg mb-2">Smart Attendance</h4>
                        <p className="text-gray-600 text-sm">
                            Track daily meal attendance and avoid food wastage efficiently.
                        </p>
                    </div>

                    {/* Staff Management */}
                    <div data-aos="zoom-in" className="bg-white p-6 rounded-2xl shadow-md text-center hover:scale-105 transition">
                        <Users className="text-indigo-600 mx-auto mb-3" size={32} />
                        <h4 className="font-semibold text-lg mb-2">Staff Management</h4>
                        <p className="text-gray-600 text-sm">
                            Manage kitchen staff, roles, and responsibilities easily.
                        </p>
                    </div>

                    {/* Feedback */}
                    <div data-aos="zoom-in" className="bg-white p-6 rounded-2xl shadow-md text-center hover:scale-105 transition">
                        <MessageSquare className="text-indigo-600 mx-auto mb-3" size={32} />
                        <h4 className="font-semibold text-lg mb-2">Give Feedback</h4>
                        <p className="text-gray-600 text-sm">
                            Share your food experience and help improve mess quality.
                        </p>
                    </div>

                    {/* Complaint */}
                    <div data-aos="zoom-in" className="bg-white p-6 rounded-2xl shadow-md text-center hover:scale-105 transition">
                        <AlertCircle className="text-indigo-600 mx-auto mb-3" size={32} />
                        <h4 className="font-semibold text-lg mb-2">Online Complaints</h4>
                        <p className="text-gray-600 text-sm">
                            Raise and track complaints directly through the platform.
                        </p>
                    </div>

                    {/* Expense Tracking */}
                    <div data-aos="zoom-in" className="bg-white p-6 rounded-2xl shadow-md text-center hover:scale-105 transition">
                        <CreditCard className="text-indigo-600 mx-auto mb-3" size={32} />
                        <h4 className="font-semibold text-lg mb-2">Expense Tracking</h4>
                        <p className="text-gray-600 text-sm">
                            Monitor daily and monthly mess expenses transparently.
                        </p>
                    </div>

                    {/* Reports */}
                    <div data-aos="zoom-in" className="bg-white p-6 rounded-2xl shadow-md text-center hover:scale-105 transition">
                        <ClipboardList className="text-indigo-600 mx-auto mb-3" size={32} />
                        <h4 className="font-semibold text-lg mb-2">Reports & Insights</h4>
                        <p className="text-gray-600 text-sm">
                            Get detailed reports and analytics for better decisions.
                        </p>
                    </div>

                </div>


            </section>


            {/* repeated section */}

            <section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

                    <div data-aos="fade-up" className="p-6 rounded-xl shadow-md">
                        <h2 className="text-3xl font-bold text-indigo-600">500+</h2>
                        <p className="text-gray-600">Students Served</p>
                    </div>

                    <div data-aos="fade-up" className="p-6 rounded-xl shadow-md">
                        <h2 className="text-3xl font-bold text-indigo-600">30+</h2>
                        <p className="text-gray-600">Meals Weekly</p>
                    </div>

                    <div data-aos="fade-up" className="p-6 rounded-xl shadow-md">
                        <h2 className="text-3xl font-bold text-indigo-600">99%</h2>
                        <p className="text-gray-600">Satisfaction</p>
                    </div>

                </div>
            </section>

        </div>
    );
}
export default Home;