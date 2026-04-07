import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";


const FeedbackList = () => {

    
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {

                setLoading(true);
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/feedbacks/getAll`);
                setFeedbacks(res.data);
            } catch (err) {
                console.error(err);
                setError(" Failed to fetch feedback");
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);


    if (error) {
        return <div className="text-center text-red-600 mt-10">{error}</div>;
    }

    return (
        <div>
            {
                loading ? (
                    <div className="flex flex-col justify-center items-center">
                        <Spinner />
                        <div>Fetching feedbacks...</div>
                    </div>
                ) : 
                (
                    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold mb-6 text-center">
                            All Feedback
                        </h2>

                        {feedbacks.length === 0 ? (
                            <p className="text-center text-gray-500">
                                No feedback available yet.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {feedbacks.map((fb, index) => (
                                    <div
                                        key={index}
                                        className="border rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition"
                                    >
                                        {/* Top Row */}
                                        <div className="flex justify-between items-center mb-2">
                                            <div>
                                                <span className="font-semibold text-blue-700">
                                                    {fb.studentName || "Anonymous"}
                                                </span>
                                                <p className="text-sm text-gray-500">
                                                    {fb.course || "N/A"}
                                                </p>
                                            </div>

                                            {/* Date (already formatted from backend) */}
                                            <span className="text-sm text-violet-500">
                                                {fb.submittedAt}
                                            </span>
                                        </div>

                                        {/* Message */}
                                        <p className="text-gray-800 mb-2">{fb.message}</p>

                                        {/* Rating */}
                                        {fb.rating && (
                                            <div className="flex space-x-1 text-yellow-400 text-lg">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i}>
                                                        {i < fb.rating ? "★" : "☆"}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )
                
            }  
              

        </div>
    );
};

export default FeedbackList;
