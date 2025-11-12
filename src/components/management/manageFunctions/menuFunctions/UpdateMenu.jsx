import React, { useState } from "react";
import axios from "axios";

const UpdateMenu = () => {
    const [day, setDay] = useState("");
    const [mealType, setMealType] = useState("");
    const [items, setItems] = useState("");
    const [message, setMessage] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!day || !mealType || !items) {
            setMessage("⚠️ Please fill all fields before updating.");
            return;
        }

        try {
            const res = await axios.put("http://localhost:4000/api/menu/updateMenu", {
                day,
                meal_type: mealType,
                items,
                
            });
            setMessage(`✅ ${res.data.message}`);
            setDay("");
            setMealType("");
            setItems("");
        } catch (error) {
            console.error("Error updating menu:", error);
            if (error.response && error.response.status === 404) {
                setMessage("❌ Menu not found for the specified day.");
            } else {
                setMessage("❌ Error updating menu. Please try again.");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                Update Menu
            </h2>

            {message && (
                <p
                    className={`text-center mb-4 ${message.includes("✅") ? "text-green-600" : "text-red-500"
                        }`}
                >
                    {message}
                </p>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
                {/* Day Input */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Day</label>
                    <input
                        type="text"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        placeholder="e.g. Monday"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Meal Type Dropdown */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Meal Type</label>
                    <select
                        value={mealType}
                        onChange={(e) => setMealType(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                    >
                        <option value="">Select meal type</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="snacks">Snacks</option>
                        <option value="dinner">Dinner</option>
                    </select>
                </div>

                {/* Items Input */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Items</label>
                    <textarea
                        value={items}
                        onChange={(e) => setItems(e.target.value)}
                        placeholder="Enter updated items (comma-separated)"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Update Button */}
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Update Menu
                </button>
            </form>
        </div>
    );
};

export default UpdateMenu;
