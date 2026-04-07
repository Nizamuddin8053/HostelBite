import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import showToast from "../../../utils/showToast";
import { TOAST_TYPE } from "../../../utils/constants";

const MarkAttendance = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [isFirstTime, setIsFirstTime] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    student_id: "",
    menu_id: "",
    meal_type: "",
  });

  // Check if user already exists in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("studentData");

    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setFormData(parsed);
      setIsFirstTime(false);
    }
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Attendance
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/attendance/mark`,
        {
          ...formData,
          token,
        }
      );

      showToast(response.data.message, TOAST_TYPE.SUCCESS);


      

      // Save user data for next time
      localStorage.setItem("studentData", JSON.stringify(formData));

      setIsFirstTime(false);
    } catch (error) {

      showToast(error.response?.data?.message || "Error marking attendance", TOAST_TYPE.ERROR);
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mess Attendance</h2>

      {isFirstTime ? (
        // FIRST TIME FORM
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="student_id"
            placeholder="Student ID"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="menu_id"
            placeholder="Menu ID"
            onChange={handleChange}
            required
          />

          <select name="meal_type" onChange={handleChange} required>
            <option value="">Select Meal</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Marking..." : "Submit & Mark Attendance"}
          </button>
        </form>
      ) : (
        // RETURNING USER
        <div>
          <p>Welcome back 👋</p>

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Marking..." : "Mark Attendance"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MarkAttendance;