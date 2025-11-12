import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewMenu = () => {
    const [menuData, setMenuData] = useState([]);
    const [error, setError] = useState("");

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    const mealTypes = ["breakfast", "lunch", "snacks", "dinner"];

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/menu/getAll");
                setMenuData(response.data);
            } catch (err) {
                setError("Error fetching menu. Please try again later.");
            }
        };
        fetchMenu();
    }, []);

    // Organize data day-wise
    const structuredMenu = days.map((day) => {
        const dayMeals = menuData.filter((m) => m.day === day);
        const menuRow = { day };
        mealTypes.forEach((meal) => {
            const mealData = dayMeals.find((m) => m.meal_type === meal);
            menuRow[meal] = mealData ? mealData.items : "-";
        });
        return menuRow;
    });

    return (
        <div className="max-w-6xl mx-auto mt-8 p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Weekly Mess Menu</h2>

            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-green-500 text-white">
                            <th className="border border-gray-300 px-4 py-2 text-left">Day</th>
                            {mealTypes.map((meal) => (
                                <th key={meal} className="border border-gray-300 px-4 py-2 capitalize text-left">
                                    {meal}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {structuredMenu.map((row) => (
                            <tr key={row.day} className="odd:bg-white even:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 font-semibold">{row.day}</td>
                                {mealTypes.map((meal) => (
                                    <td key={meal} className="border border-gray-300 px-4 py-2">
                                        {row[meal]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewMenu;
