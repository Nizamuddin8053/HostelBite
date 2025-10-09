import React from "react";
import { MessageSquare } from "lucide-react";

const ManageComplaintNotification = () => {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-md">
            <div className="flex items-center mb-3">
                <MessageSquare className="text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold">Complaints & Notifications</h2>
            </div>
            <p className="text-gray-600 mb-3">View complaints and notifications.</p>
            <div className="flex flex-wrap gap-3">
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                    {/* respond to complaint also send notification for complaint resolved */}
                    View Complaints 
                </button>
        
                <button className="bg-green-600 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                    Send Notification
                </button>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    View Notifications
                </button>
            </div>
        </div>
    );
}
export default ManageComplaintNotification;