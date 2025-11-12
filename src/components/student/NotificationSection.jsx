import React from "react";
import { Bell, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotificationSection =()=> {
    const navigate = useNavigate();
    const viewNotificationHandler = ()=>{
        navigate("/userNotification");
    }
    return (
        <div className="bg-white p-5 rounded-2xl shadow-md">
            <div className="flex items-center mb-3">
                <Bell className="text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold">Notifications</h2>
            </div>

            <p className="text-gray-600 mb-3">
                View and receive important notifications from staff and management.
            </p>

            <div  className="flex gap-3 flex-wrap">
                <button onClick={viewNotificationHandler} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    View Notifications
                </button>
                
            </div>
        </div>
    );
}

export default NotificationSection;
