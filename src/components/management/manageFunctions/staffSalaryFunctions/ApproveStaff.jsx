import { useEffect, useState } from "react";
import axios from "axios";
import showToast from "../../../../utils/showToast";
import { TOAST_TYPE } from "../../../../utils/constants";

const ApproveStaff = ({ role = "staff" }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const label = role === "staff" ? "Staff" : "Student";

  useEffect(() => {
    let current = true;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/userApprove/unapproved`,
          { params: { role } }
        );
        if (current) setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching pending approvals:", error);
        showToast(
          error.response?.data?.message || "Unable to load pending approvals",
          TOAST_TYPE.ERROR
        );
      } finally {
        if (current) setLoading(false);
      }
    };

    fetchUsers();
    return () => {
      current = false;
    };
  }, [role]);

  const handleApprove = async (id) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/userApprove/approve/${id}`,
        { role }
      );
      setUsers((previous) => previous.filter((user) => user._id !== id));
      showToast(response.data.message, TOAST_TYPE.SUCCESS);
    } catch (error) {
      console.error("Error approving account:", error);
      showToast(
        error.response?.data?.message || "Unable to approve account",
        TOAST_TYPE.ERROR
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <section className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-4 text-center text-xl font-bold text-blue-600">
          {label} Approval Requests
        </h1>
        {loading && users.length === 0 ? (
          <p className="text-center text-gray-500">Loading requests...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">No pending approvals</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between rounded border p-4"
              >
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={() => handleApprove(user._id)}
                  disabled={loading}
                  className="rounded bg-green-600 px-4 py-1 text-white hover:bg-green-700 disabled:opacity-60"
                >
                  Approve
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ApproveStaff;
