import React from "react";
import { useNavigate } from "react-router-dom";

const ExpenseItems = () => {
    const navigate = useNavigate();

    const addExpenseHandler = () => {
        navigate("/add-expense");
    }
    const updateExpenseHandler = () => {
        navigate("/update-expense");
    }
    const deleteExpenseHandler = () => {
        navigate("/delete-expense");
    }
    const viewExpenseHandler = () => {
        navigate("/view-expenses");
    }
    const checkExpenseHandler = () => {
        navigate("/check-expense");
    }

    return (
        <div className="flex flex-wrap justify-center gap-4 mt-10">
            <button
                onClick={addExpenseHandler}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                add expense
            </button>

            <button
                onClick={updateExpenseHandler}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
                update expense
            </button>

            <button
                onClick={deleteExpenseHandler}
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
                delete expense
            </button>

            <button
                onClick={viewExpenseHandler}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
                view expenses
            </button>
            <button
                onClick={checkExpenseHandler}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                check expense
            </button>
        </div>
    );
};

export default ExpenseItems;
