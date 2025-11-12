import React, { useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const ViewComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFetchComplaints = async () => {
        setLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token");

            // Decode token to know user id and role (optional)
            const decoded = jwtDecode(token);
            const student_id = decoded.id;

            // Send request with token in Authorization header
            const res = await axios.get(`http://localhost:4000/api/complaints/complaint/${student_id}`, {
               student_id,
            })

            setComplaints(res.data.complaints || []);
            setMessage("Complaints fetched successfully!");

            
        } catch (err) {
            console.error(err);
            setMessage(
                err.response?.data?.message || "Failed to fetch complaints. Try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
            <h2 className="text-2xl font-semibold text-center mb-6">
                View Complaints
            </h2>

            <button
                onClick={handleFetchComplaints}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
                {loading ? "Loading..." : "Get All Complaints"}
            </button>

            {message && (
                <p className="text-center mt-4 text-gray-700 font-medium">{message}</p>
            )}

            {complaints.length > 0 && (
                <table className="w-full mt-6 border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Title</th>
                            <th className="p-2 border">Description</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Submitted At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((c) => (
                            <tr key={c.complaint_id}>
                                <td className="border p-2 text-center">{c.complaint_id}</td>
                                <td className="border p-2">{c.title}</td>
                                <td className="border p-2">{c.description}</td>
                                <td
                                    className={`border p-2 text-center font-medium ${c.status === "Pending"
                                            ? "text-yellow-600"
                                            : c.status === "Resolved"
                                                ? "text-green-600"
                                                : "text-gray-600"
                                        }`}
                                >
                                    {c.status}
                                </td>
                                <td className="border p-2 text-center">
                                    {new Date(c.submitted_at).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewComplaints;
