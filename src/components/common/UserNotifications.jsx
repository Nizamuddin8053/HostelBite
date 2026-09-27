import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../common/Spinner"
import showToast from "../../utils/showToast";
import { TOAST_TYPE } from "../../utils/constants";


const UserNotifications = ({ userId, role }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");




    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/notification/${userId}/${role}`
                );

                setNotifications(res.data);
            } catch (err) {
                console.error("Error fetching notifications:", err);
                setError(err.response?.data?.message || "Unable to load notifications");
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [userId, role]);

    const markAsRead = async (notificationId) => {
        try {
            await axios.put(
                `${process.env.REACT_APP_API_URL}/api/notification/${notificationId}/read`
            );
            setNotifications((previous) =>
                previous.map((notification) =>
                    notification._id === notificationId
                        ? { ...notification, isRead: true }
                        : notification
                )
            );
        } catch (err) {
            showToast(
                err.response?.data?.message || "Unable to update notification",
                TOAST_TYPE.ERROR
            );
        }
    };

    return (
        <div>
            {loading ? (
                <div className="flex flex-col justify-center items-center h-60">
                    <Spinner />
                    <div className="p-4 text-gray-500 text-sm">
                        Loading notifications...
                    </div>
                </div>
            ) : error ? (
                <p className="p-4 text-center text-red-600">{error}</p>
            ) : notifications.length === 0 ? (
                <div className="p-4 text-gray-600">No recent notifications.</div>
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
                                key={n._id}
                                className={`relative border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-200 ${n.isRead ? "bg-white" : "bg-blue-50"}`}
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
                                <div className="mt-3 flex justify-end">
                                    {n.isRead ? (
                                        <span className="text-xs text-gray-500">Read</span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => markAsRead(n._id)}
                                            className="text-sm font-medium text-blue-700 hover:underline"
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                </div>

                            </div>

                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserNotifications;
