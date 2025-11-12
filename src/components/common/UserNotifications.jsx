import React, { useEffect, useState } from "react";
import axios from "axios";

const UserNotifications = ({ userId, role }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
   

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:4000/api/notifications/${userId}/${role}`
                );
                
                setNotifications(res.data);
            } catch (err) {
                console.error("Error fetching notifications:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [userId, role]);

    if (loading) {
        return <div className="p-4 text-gray-500">Loading notifications...</div>;
    }

    if (notifications.length === 0) {
        return <div className="p-4 text-gray-600">No recent notifications.</div>;
    }

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-3 text-center text-blue-600">
                🔔 Recent Notifications
            </h2>
            <ul className="space-y-3">
                {notifications.map((n) => (
                    <li
                        key={n.notification_id}
                        className="border-b pb-2 hover:bg-gray-50 transition rounded-md p-2"
                    >
                        <h3 className="font-semibold text-gray-800">{n.title}</h3>
                        <p className="text-gray-600 text-sm">{n.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                            {new Date(n.sent_at).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserNotifications;
