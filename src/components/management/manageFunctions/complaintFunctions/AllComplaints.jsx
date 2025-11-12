import React, { useEffect, useState } from "react";
import axios from "axios";

const AllComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all complaints
    const fetchComplaints = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/complaints/");
            setComplaints(res.data);
        } catch (error) {
            console.error("Error fetching complaints:", error);
        } finally {
            setLoading(false);
        }
    };

    // Resolve complaint
    const handleResolve = async (complaint_id) => {
        if (!window.confirm("Are you sure you want to mark this complaint as resolved?")) return;
        try {
            await axios.put(`http://localhost:4000/api/complaints/${complaint_id}/resolve`,{
                complaint_id: complaint_id,
                response: "Your complaint has been resolved."
            });
            alert("Complaint resolved successfully!");
            fetchComplaints(); // refresh list
        } catch (error) {
            console.error("Error resolving complaint:", error);
            alert("Failed to resolve complaint.");
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    if (loading) return <p className="text-center mt-4">Loading complaints...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Complaints</h2>
            {complaints.length === 0 ? (
                <p>No complaints found.</p>
            ) : (
                <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Student ID</th>
                            <th className="py-2 px-4 border-b">Complaint</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Created At</th>
                            <th className="py-2 px-4 border-b text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((c) => (
                            <tr key={c.complaint_id} className="text-center">
                                <td className="py-2 px-4 border-b">{c.complaint_id}</td>
                                <td className="py-2 px-4 border-b">{c.student_id}</td>
                                <td className="py-2 px-4 border-b">{c.description}</td>
                                <td
                                    className={`py-2 px-4 border-b font-semibold ${c.status === "Resolved" ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {c.status}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {new Date(c.submitted_at).toLocaleString()}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {
                                        c.status === "Pending" && <button
                                            onClick={() => handleResolve(c.complaint_id)}
                                            disabled={c.status === "resolved"}
                                            className={`px-4 py-1 rounded ${c.status === "resolved"
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                                }`}
                                        >
                                            {c.status === "resolved" ? "Resolved" : "Resolve"}
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllComplaints;
