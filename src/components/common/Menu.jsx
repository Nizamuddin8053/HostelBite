import React from "react";
import { UtensilsCrossed, DollarSign } from "lucide-react";

const Menu = () => {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-md">
            <div className="flex items-center mb-3">
                <UtensilsCrossed className="text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold">Menu</h2>
            </div>

            <p className="text-gray-600 mb-3">
                View the daily menu.
            </p>

            <div className="flex gap-3 flex-wrap">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    View Menu
                </button>

            </div>
        </div>
    );
}

export default Menu;
