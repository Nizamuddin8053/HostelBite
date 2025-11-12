import React from "react";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";


const ComplaintNotification = () => {
    const navigate = useNavigate();
    function complaintHandler(){
        navigate("/all-complaints")

    }
    function viewNotificationHandler(){
        navigate("/userNotification")
    }
    return (
        <div className="bg-white p-5 rounded-2xl shadow-md">
            <div className="flex items-center mb-3">
                <MessageSquare className="text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold">Complaints & Notifications</h2>
            </div>
            <p className="text-gray-600 mb-3">Submit and view your complaints or feedback.</p>
            <div className="flex gap-3">
                <button onClick={complaintHandler} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                    View Complaints
                </button>
                <button onClick={viewNotificationHandler} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    View Notifications
                </button>
            </div>
        </div>
    );
}
export default ComplaintNotification;