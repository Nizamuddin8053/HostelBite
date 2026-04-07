import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../common/Spinner"


const UserNotifications = ({ userId, role }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/notification/${userId}/${role}`
                );

                // TODO: mark as read

                setNotifications(res.data);
            } catch (err) {
                console.error("Error fetching notifications:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [userId, role]);


    if (notifications.length === 0) {
        return <div className="p-4 text-gray-600">No recent notifications.</div>;
    }

    return (
        <div>
            {loading ? (
                <div className="flex flex-col justify-center items-center h-60">
                    <Spinner />
                    <div className="p-4 text-gray-500 text-sm">
                        Loading notifications...
                    </div>
                </div>
            ) : (
                <div className="max-w-md mx-auto p-4 bg-white shadow-xl rounded-2xl">

                    {/* HEADER */}
                    <h2 className="text-xl font-bold mb-4 text-center text-blue-600">
                        🔔 Recent Notifications
                    </h2>

                    {/* LIST */}
                    <div className="flex flex-col gap-3">
                        {notifications.map((n) => (

                            <div
                                key={n.notification_id}
                                className="relative border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-200 bg-gray-50"
                            >

                                {/* DATE (TOP RIGHT) */}
                                <p className="absolute top-2 right-3 text-md text-violet-900">
                                    {n.sentAt
                                        ? new Date(n.sentAt).toLocaleString()
                                        : ""}
                                </p>

                                {/* TITLE */}
                                <h3 className="font-semibold text-gray-800 text-base mb-1">
                                    {n.title}
                                </h3>

                                {/* MESSAGE */}
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {n.message}
                                </p>

                            </div>

                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserNotifications;
