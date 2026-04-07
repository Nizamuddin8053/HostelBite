import { useEffect, useState } from "react";
import axios from "axios";

const AllStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); 

  // Fetch all staff
  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/staff/getAllStaff`
      );

      console.log("res:", res);

      setStaffList(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch staff");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);


  // console.log("staff list is:", staffList);

  
  const filteredStaff = staffList.filter((staff) =>
    staff.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          👨‍🏫 All Staff Members
        </h2>

        {/* 🔍 Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        {/*  Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading staff...</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* 📭 Empty */}
        {!loading && filteredStaff.length === 0 && (
          <p className="text-center text-gray-500">
            No staff found
          </p>
        )}

        {/*  Staff List */}
        <div className="space-y-4">
          {filteredStaff.map((staff) => (
            <div
              key={staff._id}
              className="border p-4 rounded-lg flex justify-between items-center hover:shadow"
            >
              <div>
                <p className="font-semibold text-lg">{staff.name}</p>
                <p className="text-sm text-gray-500">{staff.email}</p>

                {/* Salary Added */}
                <p className="text-sm mt-1 text-gray-700">
                  💰 Salary: ₹{staff.salaryAmount || "Not set"}
                </p>

                <p className="text-sm mt-1">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      staff.approved
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {staff.approved ? "Approved" : "Pending"}
                  </span>
                </p>
              </div>

              <div>
                {staff.approved ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">
                    Approved
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-sm">
                    Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AllStaff;