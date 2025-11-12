import React from "react";
import { UtensilsCrossed, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageMenuExpenses = () => {
    const navigate = useNavigate();

    const expenseHandler = () => {
        navigate("/management/expense/expense-items");
    }

    const menuHandler = () => {
        navigate("/management/menu/menu-items");
    };
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
                <button onClick={menuHandler} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    Menu
                </button>
                <button onClick={expenseHandler}  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    Expenses
                </button>
                

            </div>
        </div>
    );
}

export default ManageMenuExpenses;
