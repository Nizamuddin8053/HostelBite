import { useEffect, useState } from "react";
import axios from "axios";

const ApproveStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const fetchStaff = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/staff/unapproved`
      );

      console.log("staff data :", res);

      setStaffList(res.data.data);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  //  Approve staff
  const handleApprove = async (id) => {
    try {
      setLoading(true);

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/staff/approve/${id}`
      );

      // Remove approved staff from UI instantly
      setStaffList((prev) => prev.filter((s) => s._id !== id));

    } catch (err) {
      console.error("Error approving staff:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
          🧑‍🏫 Staff Approval Requests
        </h2>

        {staffList.length === 0 ? (
          <p className="text-center text-gray-500">
            No pending approvals
          </p>
        ) : (
          <div className="space-y-4">
            {staffList.map((staff) => (
              <div
                key={staff._id}
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{staff.name}</p>
                  <p className="text-sm text-gray-500">
                    {staff.email}
                  </p>
                </div>

                <button
                  onClick={() => handleApprove(staff._id)}
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Approve
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveStaff;