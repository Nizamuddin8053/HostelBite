import React from "react";
import { Star, ClipboardList } from "lucide-react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const FeedbackSection = () => {
    const navigate = useNavigate();

    const submitFeedback = async () => {
        navigate("/submit-feedback");
    }
    const markAttendance = async () => {
        navigate("/mark-attendance");
    }
    return (
        <div className="bg-white p-5 rounded-2xl shadow-md">
            <div className="flex items-center mb-3">
                <Star className="text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold">Feedback & Attendance</h2>
            </div>

            <p className="text-gray-600 mb-3">
                Submit feedback and view attendance records.
            </p>

            <div  className="flex gap-3 flex-wrap">
                <button onClick={submitFeedback} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    Submit Feedback
                </button>
                
                <button onClick={markAttendance} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    Attendance
                </button>
            </div>
        </div>
    );
}
export default FeedbackSection;
