import { useState } from "react";
import axios from "axios";
import StudentSearch from "../../../student/studentFunctions/StudentSearch";
import showToast from "../../../../utils/showToast";
import { TOAST_TYPE } from "../../../../utils/constants";

const GenerateInvoice = () => {
  const [mode, setMode] = useState("single"); // single | bulk
  

  const [formData, setFormData] = useState({
    student_id: "",
    course: "",
    year: "",
    amount: "",
    due_date: "",
  });

  const [loading, setLoading] = useState(false);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    try {
      let payload = {
        amount: formData.amount,
        due_date: formData.due_date,
      };

      if (mode === "single") {
        payload.student_id = formData.student_id;
      } else {
        payload.course = formData.course;
        if (formData.year) payload.year = formData.year;
      }

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/invoice/create`,
        payload
      );


      showToast(res.data.message || "Invoice created successfully", TOAST_TYPE.SUCCESS || TOAST_TYPE.INFO);

      
    } catch (err) {

      showToast(err.response?.data?.error || "Something went wrong", TOAST_TYPE.ERROR);
      
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
        💰 Generate Invoice
      </h2>

      {/* Mode Toggle */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setMode("single")}
          className={`px-4 py-2 rounded ${mode === "single" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
        >
          Single Student
        </button>
        <button
          onClick={() => setMode("bulk")}
          className={`px-4 py-2 rounded ${mode === "bulk" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
        >
          Course / Year
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ✅ Single Student with Search */}
        {mode === "single" && (
          <>
            
            <StudentSearch
              onSelect={(student) =>
                setFormData((prev) => ({
                  ...prev,
                  student_id: student._id,
                }))
              }
            />
          </>
        )}

        {/* ✅ Bulk Mode */}
        {mode === "bulk" && (
          <>
            <input
              type="text"
              name="course"
              placeholder="Course (e.g. MCA)"
              value={formData.course}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="number"
              name="year"
              placeholder="Year (optional)"
              value={formData.year}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </>
        )}

        {/* Common Fields */}
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Generate Invoice"}
        </button>
      </form>

      
    </div>
  );
};

export default GenerateInvoice;