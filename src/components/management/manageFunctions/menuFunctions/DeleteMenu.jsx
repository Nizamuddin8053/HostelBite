import React, { useState } from "react";
import axios from "axios";

const DeleteMenu = () => {
    const [message, setMessage] = useState("");

    const handleDelete = async () => {
        if (!window.confirm("⚠️ Are you sure you want to delete the entire menu?")) {
            return;
        }

        try {
            const res = await axios.delete("http://localhost:4000/api/menu/delete");
            setMessage(`✅ ${res.data.message}`);
        } catch (error) {
            console.error("Error deleting menu:", error);
            if (error.response && error.response.status === 404) {
                setMessage("❌ Menu not found.");
            } else {
                setMessage("❌ Error deleting menu. Please try again.");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delete Menu</h2>

            {message && (
                <p
                    className={`mb-4 ${message.includes("✅") ? "text-green-600" : "text-red-500"
                        }`}
                >
                    {message}
                </p>
            )}

            <button
                onClick={handleDelete}
                className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition"
            >
                Delete Entire Menu
            </button>
        </div>
    );
};

export default DeleteMenu;
