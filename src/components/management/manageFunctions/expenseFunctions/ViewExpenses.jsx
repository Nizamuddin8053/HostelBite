import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [categoryBreakdown, setCategoryBreakdown] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const totalBudget = 50000; // Example budget (you can make it dynamic later)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/expenses/viewAllExpenses");
                setExpenses(response.data.expenses);
                setTotalAmount(response.data.totalAmount);
                setCategoryBreakdown(response.data.categoryBreakdown);
            } catch (err) {
                console.error("Error fetching expenses:", err);
                setError("Failed to load expenses. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-semibold text-center mb-4">
                Mess Expense Summary
            </h2>

            {loading ? (
                <p className="text-center text-gray-600">Loading expenses...</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : (
                <>
                    {/* ===== Summary Section ===== */}
                    <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4 mb-6 text-center">
                        <div className="bg-blue-100 p-4 rounded-lg shadow">
                            <h3 className="font-semibold text-gray-800">Total Budget</h3>
                            <p className="text-2xl font-bold text-blue-700">₹{totalBudget}</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg shadow">
                            <h3 className="font-semibold text-gray-800">Total Spent</h3>
                            <p className="text-2xl font-bold text-green-700">₹{totalAmount}</p>
                        </div>
                        <div className="bg-yellow-100 p-4 rounded-lg shadow">
                            <h3 className="font-semibold text-gray-800">Remaining</h3>
                            <p className="text-2xl font-bold text-yellow-700">
                                ₹{totalBudget - totalAmount}
                            </p>
                        </div>
                    </div>

                    {/* ===== Category Breakdown ===== */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">
                            Category-wise Spending
                        </h3>
                        <table className="min-w-full border border-gray-300 rounded-lg">
                            <thead className="bg-gray-700 text-white">
                                <tr>
                                    <th className="p-2 border">Category</th>
                                    <th className="p-2 border">Total Spent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryBreakdown.map((cat, index) => (
                                    <tr key={index} className="text-center hover:bg-gray-100">
                                        <td className="p-2 border">{cat.category}</td>
                                        <td className="p-2 border text-green-700 font-semibold">
                                            ₹{cat.categoryTotal}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ===== All Expenses Table ===== */}
                    <div className="overflow-x-auto">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">
                            Detailed Expenses
                        </h3>
                        <table className="min-w-full border border-gray-300 rounded-lg">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="p-2 border">#</th>
                                    <th className="p-2 border">Title</th>
                                    <th className="p-2 border">Category</th>
                                    <th className="p-2 border">Qty</th>
                                    <th className="p-2 border">Rate/kg</th>
                                    <th className="p-2 border">Amount</th>
                                    <th className="p-2 border">Date</th>
                                    <th className="p-2 border">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map((exp, index) => (
                                    <tr key={exp.id} className="text-center hover:bg-gray-100">
                                        <td className="p-2 border">{index + 1}</td>
                                        <td className="p-2 border">{exp.title}</td>
                                        <td className="p-2 border">{exp.category}</td>
                                        <td className="p-2 border">{exp.qty}</td>
                                        <td className="p-2 border">{exp.rate_kg}</td>
                                        <td className="p-2 border font-semibold text-green-700">
                                            ₹{exp.amount}
                                        </td>
                                        <td className="p-2 border">
                                            {new Date(exp.date).toLocaleDateString("en-IN")}
                                        </td>
                                        <td className="p-2 border text-gray-700">
                                            {exp.description || "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default ViewExpenses;
