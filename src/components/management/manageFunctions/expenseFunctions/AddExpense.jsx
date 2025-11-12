import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AddExpense = () => {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        date: "",
        description: "",
        qty: "",
        rate_kg: "",
    });

    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState("");

    

    // Function to handle input change and auto-calculate amount
    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedData = {
            ...formData,
            [name]: value,
        };

        // Calculate amount dynamically
        const qty = parseFloat(updatedData.qty) || 0;
        const rate = parseFloat(updatedData.rate_kg) || 0;
        setAmount(qty * rate);

        setFormData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const management_id = decoded.id;

        // Check if all required fields are filled
        const { title, category, date, qty, rate_kg } = formData;
        if (!title || !category || !date || !qty || !rate_kg) {
            setMessage("⚠️ Please fill in all required fields.");
            return;
        }

        try {
            // Check if the same expense already exists (prevent duplicate)
            // const checkRes = await axios.post("http://localhost:4000/api/expenses/view", {
            //     title,
            //     date,
            //     category,
            // });
            // if (checkRes.data.exists) {
            //     setMessage("❌ This expense already exists!");
            //     return;
            // }

            // Proceed to add new expense
            const response = await axios.post("http://localhost:4000/api/expenses/", {
                ...formData,
                amount,
                management_id: management_id, 
            });

            setMessage("✅ " + response.data.message);
            setFormData({ title: "", category: "", date: "", description: "", qty: "", rate_kg: "" });
            setAmount(0);
        } catch (error) {
            console.error("Error:", error);
            setMessage("❌ Failed to add expense. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-semibold text-center mb-4">Add Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block font-medium">Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">Category *</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">Date *</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">Quantity (kg) *</label>
                    <input
                        type="number"
                        name="qty"
                        value={formData.qty}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">Rate per kg *</label>
                    <input
                        type="number"
                        name="rate_kg"
                        value={formData.rate_kg}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">Amount (auto-calculated)</label>
                    <input
                        type="number"
                        name="amount"
                        value={amount}
                        readOnly
                        className="w-full border p-2 rounded-md bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                        rows="3"
                        placeholder="Optional description"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
                >
                    Add Expense
                </button>
            </form>

            {message && (
                <p className="mt-4 text-center font-medium">
                    {message}
                </p>
            )}
        </div>
    );
};

export default AddExpense;
