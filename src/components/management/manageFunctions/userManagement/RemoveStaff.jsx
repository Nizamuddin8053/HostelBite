import { useEffect, useState } from "react";
import axios from "axios";
import showToast from "../../../../utils/showToast";
import { TOAST_TYPE } from "../../../../utils/constants";

const RemoveStaff = () => {
    const [staffs, setStaffs] = useState([]);
    

    // Fetch all staffs
    const fetchStaffs = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/staff/getAllStaff`);
            setStaffs(res.data);
        } catch (err) {
            console.error("Error fetching staffs:", err);
        }
    };

    // console.log("all staffs are :", staffs);

    useEffect(() => {
        fetchStaffs();
    }, []);

    // Delete a single student
    const deleteStaff = async (staff_id) => {
        if (!window.confirm("Are you sure you want to remove this staff?")) return;
        
        try {
            
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/staff/${staff_id}`);

            showToast("Staff deleted successfully!", TOAST_TYPE.SUCCESS);
            
            fetchStaffs();
        } catch (err) {
            console.error("Error deleting staff:", err);

            showToast("Error deleting staff", TOAST_TYPE.ERROR);
            
        }
    };




    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
                 Staff List
            </h2>

            {/* Staff Table */}
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full border border-gray-200 text-sm text-gray-700">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="px-4 py-3 text-left border-b">Name</th>
                            <th className="px-4 py-3 text-left border-b">Role</th>
                            <th className="px-4 py-3 text-left border-b">Email</th>
                            <th className="px-4 py-3 text-left border-b">Approved</th>
                            <th className="px-4 py-3 text-center border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffs.length > 0 ? (
                            staffs.map((s) => (
                                <tr
                                    key={s._id}
                                    className="hover:bg-gray-50 transition duration-150"
                                >
                                    
                                    <td className="px-4 py-2 border-b">{s.name}</td>
                                    <td className="px-4 py-2 border-b">{s.role}</td>
                                    <td className="px-4 py-2 border-b">{s.email}</td>
                                    <td className="px-4 py-2 border-b">{s.approved}</td>
                                    <td className="px-4 py-2 border-b text-center">
                                        <button
                                            onClick={() => deleteStaff(s._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition duration-200"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center py-6 text-gray-500 italic border-b"
                                >
                                    No staff found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default RemoveStaff;
