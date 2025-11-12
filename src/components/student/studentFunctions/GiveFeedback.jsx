import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const GiveFeedback = () => {
    
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(0);
    const [status, setStatus] = useState("");

    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const studentId = decoded.id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message) {
            setStatus("Message is required");
            return;
        }

        try {
            const res = await axios.post("http://localhost:4000/api/feedbacks/", {
                student_id: studentId,
                message,
                rating,
            });

            setStatus(`✅ ${res.data.message}`);
            setMessage("");
            setRating(0);
        } catch (err) {
            console.error(err);
            setStatus("❌ Failed to submit feedback. Try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">Submit Feedback</h2>

            {status && <p className="mb-4 text-center text-sm">{status}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                

              {/* Feedback message */}
                <div>
                    <label className="block font-medium mb-1">Message:</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your feedback..."
                        className="w-full border rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                {/* Rating */}
                <div>
                    <label className="block font-medium mb-2">Rating:</label>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`text-2xl ${rating >= star ? "text-yellow-400" : "text-gray-300"
                                    }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default GiveFeedback;
