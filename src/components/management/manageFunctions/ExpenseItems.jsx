import React from "react";
import { useNavigate } from "react-router-dom";

const ExpenseItems = () => {
    const navigate = useNavigate();

    const addExpenseHandler = () => {
        navigate("/add-expense");
    }
    
    const viewExpenseHandler = () => {
        navigate("/view-expenses");
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
                onClick={viewExpenseHandler}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
                view expenses
            </button>
           
        </div>
    );
};

export default ExpenseItems;
