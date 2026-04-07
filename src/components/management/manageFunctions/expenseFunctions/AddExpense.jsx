import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import showToast from "../../../../utils/showToast";
import { TOAST_TYPE } from "../../../../utils/constants";


const itemCategoryMap = {
    eggs: "Protein",
    pulses: "Protein",
    milk: "Protein",

    rice: "Grains",
    wheat: "Grains",
    bread: "Grains",
    poha: "Grains",

    fruits: "Fruits & Veggies",
    vegetables: "Fruits & Veggies",

    biscuit: "Snacks",

    sugar: "Sweeteners",
    jam: "Sweeteners",
};

const AddExpense = () => {
    const [formData, setFormData] = useState({
        item: "",
        category: "",
        date: "",
        description: "",
        qty: "",
        rateKg: "",
    });

    const [amount, setAmount] = useState(0);
    

    const handleChange = (e) => {
        const { name, value } = e.target;

        let updatedData = {
            ...formData,
            [name]: value,
        };

        // Auto-set category when item changes
        if (name === "item") {
            updatedData.category = itemCategoryMap[value] || "";
        }

        // Calculate amount
        const qty = parseFloat(updatedData.qty) || 0;
        const rate = parseFloat(updatedData.rateKg) || 0;
        setAmount(qty * rate);

        setFormData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const management_id = decoded.id;

        const { item, category, date, qty, rateKg } = formData;

        if (!item || !category || !date || !qty || !rateKg) {

            showToast(" Please fill in all required fields.", TOAST_TYPE.ERROR);
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/expenses/create-expense`,
                {
                    ...formData,
                    amount,
                    managementId: management_id,
                }
            );

            showToast(response.data.message, TOAST_TYPE.SUCCESS);

           
            setFormData({
                item: "",
                category: "",
                date: "",
                description: "",
                qty: "",
                rateKg: "",
            });
            setAmount(0);
        } catch (error) {
            console.error(error);

            showToast("Failed to add expense.", TOAST_TYPE.ERROR);
            
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-semibold text-center mb-4">
                Add Expense
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* ITEM DROPDOWN */}
                <div>
                    <label className="block font-medium">Item *</label>
                    <select
                        name="item"
                        value={formData.item}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                        required
                    >
                        <option value="">Select Item</option>
                        {Object.keys(itemCategoryMap).map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                
                {/* CATEGORY (READ ONLY AUTO-FILLED) */}
                <div>
                    <label className="block font-medium">Category *</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        readOnly
                        placeholder="Auto-filled based on item"
                        className="w-full border p-2 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* DATE */}
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

                {/* QTY */}
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

                {/* RATE */}
                <div>
                    <label className="block font-medium">Rate per kg *</label>
                    <input
                        type="number"
                        name="rateKg"
                        value={formData.rateKg}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                        required
                    />
                </div>

                {/* AMOUNT */}
                <div>
                    <label className="block font-medium">
                        Amount (auto-calculated)
                    </label>
                    <input
                        type="number"
                        value={amount}
                        readOnly
                        className="w-full border p-2 rounded-md bg-gray-100"
                    />
                </div>

                {/* DESCRIPTION */}
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                        rows="3"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md"
                >
                    Add Expense
                </button>
            </form>

            
        </div>
    );
};

export default AddExpense;