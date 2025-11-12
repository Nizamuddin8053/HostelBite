import React, { useState } from "react";
import axios from "axios";

const CreateMenu = () => {
    const [mealType, setMealType] = useState("breakfast");
    const [menuItems, setMenuItems] = useState([
        { day: "Monday", items: "" },
        { day: "Tuesday", items: "" },
        { day: "Wednesday", items: "" },
        { day: "Thursday", items: "" },
        { day: "Friday", items: "" },
        { day: "Saturday", items: "" },
        { day: "Sunday", items: "" },
    ]);
    const [message, setMessage] = useState("");

    const handleChange = (index, value) => {
        const updated = [...menuItems];
        updated[index].items = value;
        setMenuItems(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const emptyFields = menuItems.some((m) => !m.items.trim());
        if (emptyFields) {
            setMessage("❌ Please fill all 7 days before submitting.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/api/menu/", {
                meal_type: mealType,
                menuItems,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || "Error adding weekly menu");
        }
    };

    return (
        <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
            <h2 className="text-xl font-bold text-center mb-4">
                Add Weekly Menu ({mealType})
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="block mb-1 font-medium">Select Meal Type:</label>
                    <select
                        className="border p-2 w-full rounded"
                        value={mealType}
                        onChange={(e) => setMealType(e.target.value)}
                        required
                    >
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="snacks">Snacks</option>
                        <option value="dinner">Dinner</option>
                    </select>
                </div>

                {menuItems.map((menu, index) => (
                    <div key={menu.day} className="mb-2">
                        <label className="block mb-1 font-medium">{menu.day}:</label>
                        <input
                            type="text"
                            placeholder={`Enter ${mealType} items`}
                            className="border p-2 w-full rounded"
                            value={menu.items}
                            onChange={(e) => handleChange(index, e.target.value)}
                            required
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600"
                >
                    Save {mealType} Menu
                </button>
            </form>

            {message && (
                <p
                    className={`mt-3 text-center font-medium ${message.includes("successfully") ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default CreateMenu;
