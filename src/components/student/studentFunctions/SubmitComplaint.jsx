import React, { useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; 
const SubmitComplaint = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    
    const token = localStorage.getItem("token"); // assuming token is user_id for simplicity
    const decoded = jwtDecode(token);
    const student_id = decoded.id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            setMessage("All fields are required!");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const res = await axios.post("http://localhost:4000/api/complaints/complaint", {
                student_id,
                title,
                description,
            });

            setMessage(res.data.message);
            setTitle("");
            setDescription("");
        } catch (err) {
            setMessage(
                err.response?.data?.message || "Something went wrong. Please try again."
            );
            console.error(err);
        } finally {
            setLoading(false);
        }
        
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
            <h2 className="text-2xl font-semibold text-center mb-6">
                Submit a Complaint
            </h2>

            {message && (
                <p
                    className={`text-center mb-4 ${message.toLowerCase().includes("success")
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                >
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter complaint title"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your complaint..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                    {loading ? "Submitting..." : "Submit Complaint"}
                </button>
            </form>
        </div>
    );
};

export default SubmitComplaint;
