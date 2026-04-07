import React, { useEffect, useState } from "react";
import axios from "axios";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const meals = ["breakfast", "lunch", "snacks", "dinner"];

const ViewMenu = () => {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/menu/latest-menu`
      );
      setMenu(res.data);
    } catch (err) {
      console.error("Error fetching menu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg">Loading menu...</p>
      </div>
    );

  if (!menu)
    return (
      <div className="text-center mt-10 text-gray-500">
        No menu available
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Weekly Menu
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map((day) => (
          <div
            key={day}
            className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-lg transition"
          >
            
            <h3 className="text-xl font-semibold capitalize mb-4 text-center text-gray-700">
              {day}
            </h3>

            <div className="space-y-2">
              {meals.map((meal) => (
                <p key={meal} className="text-sm text-gray-700">
                  <span className="font-semibold capitalize text-gray-900">
                    {meal}:
                  </span>{" "}
                  {menu?.[day]?.[meal]?.length
                    ? menu[day][meal].join(", ")
                    : (
                      <span className="text-gray-400 italic">
                        Not added
                      </span>
                    )}
                </p>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default ViewMenu;