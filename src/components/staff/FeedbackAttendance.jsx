import React from "react";
import { Star, ClipboardList } from "lucide-react";
import axios from "axios";

const FeedbackAttendance = () => {


    return (
        <div className="bg-white p-5 rounded-2xl shadow-md">
            <div className="flex items-center mb-3">
                <Star className="text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold">Feedback & Attendance</h2>
            </div>

            <p className="text-gray-600 mb-3">
                View feedback and attendance records.
            </p>

            <div className="flex gap-3 flex-wrap">
                
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                    View Feedback
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    View Attendance
                </button>
            </div>
        </div>
    );
}
export default FeedbackAttendance;
