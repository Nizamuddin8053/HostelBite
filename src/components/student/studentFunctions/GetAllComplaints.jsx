import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import showToast from "../../../utils/showToast";
import { TOAST_TYPE } from "../../../utils/constants";

const GetAllComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFetchComplaints = async () => {
        setLoading(true);


        try {
            const token = localStorage.getItem("token");


            const decoded = jwtDecode(token);
            const student_id = decoded.id;


            // Send request with token in Authorization header
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/complaints/complaint/${student_id}`, {
                student_id,
            })

            setComplaints(res.data.complaints);

            
            if (complaints.length > 0) {
                showToast("Complaints fetched successfully!", TOAST_TYPE.SUCCESS);
                

            } else {

                showToast("no complaint to fetch", TOAST_TYPE.INFO);
                

            }


        } catch (err) {

            showToast(err.response?.data?.message || "Failed to fetch complaints. Try again.", TOAST_TYPE.ERROR);


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



            {complaints.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full mt-6 border border-gray-300 text-sm">

                        {/* HEADER */}
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border">ID</th>
                                <th className="p-2 border">Title</th>
                                <th className="p-2 border">Description</th>
                                <th className="p-2 border">Status</th>
                                <th className="p-2 border">Submitted At</th>
                                <th className="p-2 border">Response</th>
                                <th className="p-2 border">Resolved At</th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody>
                            {complaints.map((c) => (
                                <tr key={c.complaint_id}>

                                    <td className="border p-2 text-center">
                                        {c.complaint_id}
                                    </td>

                                    <td className="border p-2 font-medium">
                                        {c.title}
                                    </td>

                                    <td className="border p-2">
                                        {c.description}
                                    </td>

                                    {/* STATUS */}
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

                                    {/* SUBMITTED */}
                                    <td className="border p-2 text-center">
                                        {c.submittedAt
                                            ? new Date(c.submittedAt).toLocaleString()
                                            : "N/A"}
                                    </td>

                                    {/* RESPONSE */}
                                    <td className="border p-2 text-center">
                                        {c.response ? (
                                            c.response
                                        ) : (
                                            <span className="text-gray-400">No response</span>
                                        )}
                                    </td>

                                    {/* RESOLVED AT */}
                                    <td className="border p-2 text-center">
                                        {c.respondedAt ? (
                                            <span className="text-green-600 font-medium">
                                                {new Date(c.respondedAt).toLocaleString()}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">Pending</span>
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

export default GetAllComplaints;
