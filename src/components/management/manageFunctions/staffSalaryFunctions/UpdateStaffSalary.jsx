import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../../common/Spinner";
import showToast from "../../../../utils/showToast";
import { TOAST_TYPE } from "../../../../utils/constants";

const UpdateStaffSalary = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [salaryInputs, setSalaryInputs] = useState({});


  const handleChange = (id, value) => {
    setSalaryInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
  };


  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/staff/getAllStaff`
      );



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


  const updateSalary = async (id, salary) => {
    setLoading(true);
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/staff/update-salary/${id}`, {
        salaryAmount: salary,
      });


      showToast(" staff salary updated successfully", TOAST_TYPE.SUCCESS);


      fetchStaff();
      setLoading(false);

    } catch (err) {

      showToast("error while updating salary", TOAST_TYPE.ERROR);
  
      console.error(err);
    }finally{
      setLoading(false);
    }
  };


  const handleUpdate = (id) => {
    const newSalary = salaryInputs[id];
    if (!newSalary) return alert("Enter a salary amount ");

    updateSalary(id, newSalary); // call the function to change salary
  };





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

        {/*  Error */}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Empty */}
        {!loading && filteredStaff.length === 0 && (
          <p className="text-center text-gray-500">
            No staff found
          </p>
        )}




        {/* Staff List */}

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full border border-gray-200">


            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Salary</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Update Salary</th>
              </tr>
            </thead>


            {
              loading ? <div className="flex flex-col justify-center items-center">
                <Spinner/>
                <div className="font-medium text-violet-500">wait!! updating....</div>
                </div> :
                <tbody>
                  {filteredStaff.map((staff) => (
                    <tr key={staff._id} className="border-t hover:bg-gray-50">

                      <td className="p-3 font-medium">{staff.name}</td>

                      <td className="p-3">{staff.role || "Staff"}</td>

                      <td className="p-3 text-sm text-gray-600">
                        {staff.email}
                      </td>

                      <td className="p-3">
                        ₹{staff.salaryAmount || "Not set"}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${staff.approved
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {staff.approved ? "Approved" : "Pending"}
                        </span>
                      </td>

                      {/*  Salary Update */}
                      <td className="p-3 flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Enter salary"
                          className="border px-2 py-1 rounded w-28 text-sm"
                          value={salaryInputs[staff._id] || ""}
                          onChange={(e) =>
                            handleChange(staff._id, e.target.value)
                          }
                        />

                        <button
                          onClick={() => handleUpdate(staff._id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Update
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
            }
          </table>
        </div>


      </div>
    </div>
  );
};

export default UpdateStaffSalary;