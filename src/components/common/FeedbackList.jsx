import React, { useEffect, useState } from "react";
import axios from "axios";

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/feedbacks/getAll");
                setFeedbacks(res.data);
            } catch (err) {
                console.error(err);
                setError("❌ Failed to fetch feedback");
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-lg">
                Loading feedback...
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-600 mt-10">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">All Feedback</h2>

            {feedbacks.length === 0 ? (
                <p className="text-center text-gray-500">No feedback available yet.</p>
            ) : (
                <div className="space-y-4">
                    {feedbacks.map((fb) => (
                        <div
                            key={fb.id}
                            className="border rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-blue-700">
                                    {fb.student_name || "Anonymous"}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {new Date(fb.submitted_at).toLocaleString()}
                                </span>
                            </div>

                            <p className="text-gray-800 mb-2">{fb.message}</p>

                            {/* Rating display */}
                            {fb.rating && (
                                <div className="flex space-x-1 text-yellow-400 text-lg">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>{i < fb.rating ? "★" : "☆"}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FeedbackList;
