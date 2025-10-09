import React from "react";
import { UtensilsCrossed, DollarSign } from "lucide-react";

const ManageMenuExpenses = () => {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-md">
            <div className="flex items-center mb-3">
                <UtensilsCrossed className="text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold">Menu & Expenses</h2>
            </div>

            <p className="text-gray-600 mb-3">
                View the daily menu and manage expenses.
            </p>

            <div className="flex gap-3 flex-wrap">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    Add Menu
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    View Menu
                </button>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    Add Expenses
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    View Expenses
                </button>

            </div>
        </div>
    );
}

export default ManageMenuExpenses;
