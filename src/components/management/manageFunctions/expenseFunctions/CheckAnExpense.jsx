import React, { useState } from "react";
import axios from "axios";

const CheckAnExpense = () => {
    const [expenseId, setExpenseId] = useState("");
    const [expense, setExpense] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!expenseId.trim()) {
            setError("Please enter a valid Expense ID.");
            setExpense(null);
            return;
        }

        setLoading(true);
        setError("");
        setExpense(null);

        try {
            const response = await axios.get(`http://localhost:4000/api/expenses/${expenseId}`);
            setExpense(response.data);
        } catch (err) {
            console.error("Error fetching expense:", err);
            if (err.response && err.response.status === 404) {
                setError("Expense not found.");
            } else {
                setError("Something went wrong. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">
                Check Expense Details
            </h2>

            {/* ===== Search Form ===== */}
            <form
                onSubmit={handleSearch}
                className="flex items-center justify-center gap-3 mb-6"
            >
                <input
                    type="number"
                    placeholder="Enter Expense ID"
                    value={expenseId}
                    onChange={(e) => setExpenseId(e.target.value)}
                    className="border border-gray-400 rounded-lg p-2 w-1/2 focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Search
                </button>
            </form>

            {/* ===== Status Messages ===== */}
            {loading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="text-center text-red-600 font-medium">{error}</p>}

            {/* ===== Expense Details ===== */}
            {expense && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">
                        Expense Found ✅
                    </h3>
                    <table className="min-w-full border border-gray-300 rounded-lg">
                        <tbody>
                            <tr className="border-b">
                                <td className="p-2 font-semibold border">ID</td>
                                <td className="p-2 border">{expense.id}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold border">Title</td>
                                <td className="p-2 border">{expense.title}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold border">Category</td>
                                <td className="p-2 border">{expense.category}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold border">Quantity (kg)</td>
                                <td className="p-2 border">{expense.qty}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold border">Rate/kg</td>
                                <td className="p-2 border">₹{expense.rate_kg}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold border">Amount</td>
                                <td className="p-2 border text-green-700 font-semibold">
                                    ₹{expense.amount}
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold border">Date</td>
                                <td className="p-2 border">
                                    {new Date(expense.date).toLocaleDateString("en-IN")}
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2 font-semibold border">Description</td>
                                <td className="p-2 border">{expense.description || "—"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CheckAnExpense;
