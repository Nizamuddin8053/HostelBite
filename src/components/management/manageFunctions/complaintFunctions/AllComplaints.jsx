import  { useEffect, useState } from "react";
import axios from "axios";
import showToast from "../../../../utils/showToast";
import { TOAST_TYPE } from "../../../../utils/constants";


const AllComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all complaints
    const fetchComplaints = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/complaints/`);
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
            await axios.put(`${process.env.REACT_APP_API_URL}/api/complaints/${complaint_id}/resolve`, {
                complaint_id: complaint_id,
                response: "Your complaint has been resolved."
            });

            showToast("Complaint resolved successfully!", TOAST_TYPE.SUCCESS);
            

            fetchComplaints(); // refresh list
        } catch (error) {
            console.error("Error resolving complaint:", error);

            showToast("Failed to resolve complaint.", TOAST_TYPE.ERROR);
            
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
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded-lg">

                        {/* HEADER */}
                        <thead className="bg-gray-100">
                            <tr>
                
                                <th className="py-2 px-4 border-b">Student</th>
                                <th className="py-2 px-4 border-b">Course</th>
                                <th className="py-2 px-4 border-b">Room</th>
                                <th className="py-2 px-4 border-b">Title</th>
                                <th className="py-2 px-4 border-b">Description</th>
                                <th className="py-2 px-4 border-b">Status</th>
                                <th className="py-2 px-4 border-b">Submitted</th>
                                <th className="py-2 px-4 border-b">Response</th>
                                <th className="py-2 px-4 border-b">Responded At</th>
                                <th className="py-2 px-4 border-b text-center">Action</th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody className="text-violet-900">
                            {complaints.map((c) => (
                                <tr key={c.complaint_id} className="text-center">


                                    <td className="py-2 px-4 border-b">
                                        {c.studentName} <br />
                                        <span className="text-xs text-gray-500">{c.studentId}</span>
                                    </td>

                                    <td className="py-2 px-4 border-b">{c.course}</td>

                                    <td className="py-2 px-4 border-b">{c.roomNumber}</td>

                                    <td className="py-2 px-4 border-b font-semibold">{c.title}</td>

                                    <td className="py-2 px-4 border-b">{c.description}</td>

                                    <td
                                        className={`py-2 px-4 border-b font-semibold ${c.status === "Resolved"
                                                ? "text-green-600"
                                                : "text-red-600"
                                            }`}
                                    >
                                        {c.status}
                                    </td>

                                    <td className="py-2 px-4 border-b">
                                        {new Date(c.submittedAt).toLocaleString()}
                                    </td>

                                    <td className="py-2 px-4 border-b">
                                        {c.response || (
                                            <span className="text-gray-400">No response</span>
                                        )}
                                    </td>

                                    <td className="py-2 px-4 border-b">
                                        {c.respondedAt
                                            ? new Date(c.respondedAt).toLocaleString()
                                            : "-"}
                                    </td>

                                    <td className="py-2 px-4 border-b">
                                        {c.status === "Pending" && (
                                            <button
                                                onClick={() => handleResolve(c.complaint_id)}
                                                className="px-4 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
                                            >
                                                Resolve
                                            </button>
                                        )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    );
};

export default AllComplaints;
